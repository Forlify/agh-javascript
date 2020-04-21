handleOperations = function (operations) {
    let results = [];
    for (argument of operations) {
        let values = argument.values;
        let operation = argument.operation;

        let result = values.splice(0, 1)[0]

        for(value of values) {
            switch(operation) {
                case "+":
                  result += value;
                  break;
                case "-":
                    result -= value;
                  break;
                case "*":
                    result *= value;
                  break;
                case "/":
                    result /= value;
                  break;
              }
        }
        results.push(result);
    }

    return results;
};

module.exports = handleOperations;