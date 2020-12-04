let classifier;
let net;

function CreateModel() {
    const model = tf.sequential();

    model.add(tf.layers.dense({
        inputShape: 1,
        activation: 'sigmoid',
        units: 52
    }));

    model.add(tf.layers.dense({
        activation: 'sigmoid',
        units: 52
    }));

    model.add(tf.layers.dense({
        units: 26
    }));

    model.compile({optimizer: 'adam', loss: 'categoricalCrossentropy', metrics: ['accuracy']});
    return model
}

const TrainModel = async function (model, data, labels, epochs=10000)
{
    const options = {
        epochs: epochs,
        verbose: 0,
        batchSize: 8,
        callbacks: {
            onEpochBegin: async (epoch, logs) => {
                console.log(`Epochs ${epoch + 1} of ${epochs} ...`);
            },
            onEpochEnd: async (epoch, logs) => {
                console.log(`-- train-set loss: ${logs.loss.toFixed(4)}`);
                console.log(`-- train-set accuracy: ${logs.acc.toFixed(4)}`);
            }
        }
    };

    return await model.fit(data, labels, options);    
};

const run = async function() {
    let shift = 5;
    let inputs = [];
    let targets = [];

    for (i = 0; i < 26; i++)
    {
        inputs.push([i]);
        
        targets.push([]);
        for (let j = 0; j < 26; j++)
        {
            targets[i].push(0);
        }
        targets[i][i+shift%26] = 1;
    }

    console.log(inputs);
    console.log(targets)

    let inputs_t = tf.tensor(inputs);
    let targets_t = tf.tensor(targets);

    model = CreateModel();

    const info = await TrainModel(model, inputs_t, targets_t);

    test_t = tf.tensor([0])
    x = model.predict(test_t);
    x.print()
}

run()