var id = 0;


// from https://medium.com/liquid-carrot/creating-a-neural-network-from-scratch-in-javascript-part-1-e469f436442d
function Neuron(bias=undefined) 
{
    this.id = id;
    id += 1;
    
    this.bias = bias == undefined ? Math.random() * 2 - 1 : bias;
    this.squash;
    this.cost;
    
    this.incoming = {
        targets: {},
        weights: {}
    }
    
    this.outgoing = {
        targets: {},
        weights: {}
    }
    
    this._output; // f'(x)
    this.output; // f(x)
    this.error; // E'(f(x))
    this._error; // E(f(x))
    
    this.connect = function(neuron, weight)
    {
        this.outgoing.targets[neuron.id] = neuron;
        neuron.incoming.targets[this.id] = this;
        this.outgoing.weights[this.id] = neuron.incoming.weights[this.id] = weight == undefined ? Math.random() * 2 - 1 : weight; 
    }
    
    this.activate = function(input)
    {
        const self = this;
        
        function sigmoid(x) { return 1 / (1 + Math.exp(-x)); };
        function _sigmoid(x) { return sigmoid(x) * (1 - sigmoid(x)); };
        
        if (input)
        {
            this._output = 1;
            this.output = input;
        }
        else
        {
            // sum(x (*) w)
            const sum = Object.keys(this.incoming.targets).reduce(function(total, target, index) {
                return total += self.incoming.targets[target].output * self.incoming.weights[target];
            }, this.bias);
            this._output = _sigmoid(sum);
            this.output = sigmoid(sum);
        }
        
        return this.output;
    }
    
    this.propogate = function(target, rate=0.3) {
        const self = this;
        
        const sum = target == undefined ? Object.keys(this.outgoing.targets).reduce(function(total, target, idx) {
            self.outgoing.targets[target].incoming.weights[self.id] = self.outgoing.weights[target] -= rate * self.outgoing.targets[target].error * self.output;
            return total += self.outgoing.targets[target].error * self.outgoing.weights[target];
        }, 0) : this.output - target;
        
        this.error = sum * this._output
        
        this.bias -= rate * this.error;
        
        return this.error;
    }
}