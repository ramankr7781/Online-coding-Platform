const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Problem = require('./src/models/problem');

dotenv.config();

const pythonInitialCode = `import sys

def main():
    input_data = sys.stdin.read().strip().split('\\n')
    if not input_data or not input_data[0]:
        return
    # Read input and solve here

if __name__ == '__main__':
    main()
`;

const migratePython = async () => {
    try {
        await mongoose.connect(process.env.DB_CONNECT_STRING);
        console.log("Connected to MongoDB");

        const problems = await Problem.find({});
        let updatedCount = 0;

        for (let prob of problems) {
            let hasPythonStart = prob.startCode.some(sc => sc.language === 'Python');
            let hasPythonRef = prob.referenceSolution.some(sc => sc.language === 'Python');

            if (!hasPythonStart) {
                prob.startCode.push({
                    language: 'Python',
                    initialCode: pythonInitialCode
                });
            }

            if (!hasPythonRef) {
                prob.referenceSolution.push({
                    language: 'Python',
                    completeCode: pythonInitialCode // placeholder
                });
            }

            if (!hasPythonStart || !hasPythonRef) {
                await prob.save();
                updatedCount++;
            }
        }

        console.log(`Successfully added Python boilerplate to ${updatedCount} existing problems!`);
        
    } catch (err) {
        console.error("Error migrating problems:", err);
    } finally {
        mongoose.connection.close();
    }
};

migratePython();
