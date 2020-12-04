function main()
{
    const canvas = document.getElementById("landing_canvas");
    const ctx = canvas.getContext("2d");

    // resizing
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    // ctx.fillStyle = "blue";
    // ctx.fillRect(0, 0, canvas.width, canvas.height);

    console.log("canvas");

    nn = new TitleDrawer(canvas);
}

class TitleDrawer {
    constructor(canvas)
    {
        this._canvas = canvas;
        this._layers = [];

        this.Resize();
        this.Draw();
    }

    Draw()
    {   
        // this will loop through a list of calculated positions

        let ctx = this._canvas.getContext("2d");
        // draw "input" layer
        for (let i = 0; i < this._layers.length; i++)
        {
            for (let j = 0; j < this._layers[i].length; j++)
            {
                let x = this._layers[i][j][0];
                let y = this._layers[i][j][1];
                let r = this._layers[i][j][2];
                ctx.beginPath();
                ctx.arc(x, y, r, 0, 2 * Math.PI);
                ctx.stroke();
            }
            
            // TODO fix this to draw lines
            // if (i+1 < this._layers.length)
            // {
            //     for (let k = 0; i < this._layers[i+1].length; k++)
            //     {
            //         console.log(k);
            //     }
            // }
        }

        console.log(this._layers);

        // draw "hidden" layers

        // draw output lighting up
    }
    
    Resize()
    {
        // calculate the positions
        let w = this._canvas.width;
        let h = this._canvas.height;

        let neuron_radius = 7;
        let starting_x  = w * .1 + neuron_radius * 2;
        let starting_y  = neuron_radius * 2;
        
        this._layers = [];
        let input_layer = this.CreateLayer(20, starting_x, starting_y, neuron_radius);
        this._layers.push(input_layer);

        let hidden_x = starting_x + 100;
        let hidden_layer = this.CreateLayer(30, hidden_x, starting_y, neuron_radius);
        this._layers.push(hidden_layer);

        let output_x = hidden_x + 100;
        let output_layer = this.CreateLayer(26, output_x, starting_y, neuron_radius);
        this._layers.push(output_layer);
    }

    CreateLayer(num_neurons, s_x, s_y, radius)
    {
        let layer = [];
        let neuron_x = s_x;
        let neuron_r = radius;

        for (let i = 1; i <= num_neurons; i++)
        {
            let neuron = [];
            let neuron_y = s_y + i * neuron_r * 2.5;

            let neuron_cx = neuron_x + neuron_r;
            let neuron_cy = neuron_y + neuron_r;

            neuron.push(neuron_x);
            neuron.push(neuron_y);
            neuron.push(neuron_r);
            neuron.push(neuron_cx);
            neuron.push(neuron_cy);

            layer.push(neuron);
        }
        return layer;
    }
}

main();