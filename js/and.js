const dataset = [
    { inputs: [0,0], outputs: [0] },
    { inputs: [0,1], outputs: [0] },
    { inputs: [1,0], outputs: [0] },
    { inputs: [1,1], outputs: [1] }
]
console.log(dataset);
const inputs = [new Neuron(), new Neuron()];
const hiddens = [new Neuron(), new Neuron()];
const outputs = [new Neuron()];

// connect
inputs[0].connect(hiddens[0]);
inputs[0].connect(hiddens[1]);
inputs[1].connect(hiddens[0]);
inputs[1].connect(hiddens[1]);

hiddens[0].connect(outputs[0]);
hiddens[1].connect(outputs[0]);

const activate = (input) =>
{
    inputs.forEach((neuron, i) => neuron.activate(input[i]));
    hiddens.forEach(neuron => neuron.activate());
    output = outputs.map(neuron => neuron.activate());
    console.log(output);
    return output;
}

const propogate = (target) => {
    outputs.forEach((neuron, t) => neuron.propogate(target[t]));
    hiddens.forEach(neuron => neuron.propogate());
    return inputs.forEach(neuron => neuron.propogate());
}

const train = (iterations=1) => {
    while (iterations > 0)
    {
        dataset.map(datum => {
            activate(datum.inputs);
            propogate(datum.outputs);
        });
        iterations--;
    }
}

train(1);
console.log(activate([0,0]));
console.log(activate([0,1]));
console.log(activate([1,0]));
console.log(activate([1,1]));