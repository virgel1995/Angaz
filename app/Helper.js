const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

class Helper {
    constructor() { }
    /**
     * Generates a random code using the uuidv4 function.
     *
     * @return {string} The generated random code.
     */
    static generateRandomCode() {
        return uuidv4();
    }

    /**
     * Waits for a specified amount of time.
     *
     * @param {number} time - The amount of time to wait in milliseconds.
     * @return {Promise<void>} A Promise that resolves after the specified time has elapsed.
     */
    static async Sleep(time) {
        await new Promise((resolve) => setTimeout(resolve, time));
    }
    /**
     * @param {number} level
     * @param {string} content
     * @param {object || null} ex
     * @returns undefined
     */
    static writeLogger(level, content, ex) {
        let data = {
            level,
            time: new Date(),
            msg: content,
            error: ex,
        };
        let existingData = [];
        const filePath = 'logs/errors.json';
        let isExits = fs.existsSync(filePath);
        if (isExits) {
            const existingDataJSON = fs.readFileSync(filePath, 'utf-8');

            if (existingDataJSON === '') {
                fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
            }
            try {
                existingData = JSON.parse(existingDataJSON);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(`Error parsing existing data: ${error}`);
                return;
            }
        }
        const mergedData = [...existingData, data];
        const jsonData = JSON.stringify(mergedData, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf-8');
    }

    /**
     * Writes JSON data to a file.
     *
     * @param {string} path - The path to the file.
     * @param {any} contenet - The content to be written as JSON.
     * @return {void} No return value.
     */
    static writeJson(path, contenet) {
        let data = {
            contenet,
            date: new Date(),
        };
        let existingData = [];
        const filePath = path;
        let isExits = fs.existsSync(filePath);
        if (isExits) {
            const existingDataJSON = fs.readFileSync(filePath, 'utf-8');

            if (existingDataJSON === '') {
                fs.writeFileSync(filePath, JSON.stringify([], null, 2), 'utf-8');
            }
            try {
                existingData = JSON.parse(existingDataJSON);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(`Error parsing existing data: ${error}`);
                return;
            }
        }
        const mergedData = [...existingData, data];
        const jsonData = JSON.stringify(mergedData, null, 2);
        fs.writeFileSync(filePath, jsonData, 'utf-8');
    }

    /**
     * Validates if a given URL is valid.
     *
     * @param {string} url - The URL to be validated.
     * @return {boolean} Returns true if the URL is valid, false otherwise.
     */
    static isValidURL(url) {
        const urlPattern = /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/i;
        return urlPattern.test(url);
    }

    /**
     * Check if the input is a valid date.
     * @param {string | number | Date} input - The input to be checked.
     * @returns {boolean} - True if the input is a valid date, false otherwise.
     */
    static isDate(input) {
        const date = new Date(input);
        if (isNaN(date)) {
            return false;
        }
        const dateParts = date.toString().split(' ');
        return dateParts.length > 1;
    }

    /**
     * Checks if two arrays are equal.
     *
     * @param {Array} arr1 - The first array to compare.
     * @param {Array} arr2 - The second array to compare.
     * @return {boolean} Returns true if the arrays are equal, false otherwise.
     */
    static arraysAreEqual(arr1, arr2) {
        // Check if the arrays have the same length
        if (arr1.length !== arr2.length) {
            return false;
        }
        arr1.sort();
        arr2.sort();
        for (let i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i]) {
                return false;
            }
        }
        return true;
    }
    /**
     * Returns true if two arrays are equal without considering the order of their elements.
     *
     * @param {Array} arr1 - The first array to compare.
     * @param {Array} arr2 - The second array to compare.
     * @return {boolean} True if the arrays are equal without order, false otherwise.
     */
    static arraysAreEqualWithoutOrder(arr1, arr2) {
        if (arr1.length !== arr2.length) {
            return false;
        }
        const set1 = new Set(arr1);
        const set2 = new Set(arr2);
        return set1.size === set2.size && [...set1].every((value) => set2.has(value));
    }

    //--------------------------------------------- needed
    static validateDate(inputDateString) {
        // Define a regular expression for the 'MM-DD-YYYY' format
        const dateRegex = /^(\d{2})-(\d{2})-(\d{4})$/;

        // Check if the input string matches the expected format
        const match = inputDateString.match(dateRegex);

        if (!match) {
            return false;
        }

        // Extract month, day, and year components from the regex match
        let [, month, day, year] = match;

        // Convert string values to integers
        const monthInt = parseInt(month, 10);
        const dayInt = parseInt(day, 10);
        const yearInt = parseInt(year, 10);

        // Check if the values are within valid ranges
        if (
            monthInt < 1 || monthInt > 12 ||
            dayInt < 1 || dayInt > 31 ||
            yearInt < 1000 || yearInt > 9999
        ) {
            return false;
        }

        // Check for specific constraints if needed (e.g., no February 30th)
        const lastDayOfMonth = new Date(yearInt, monthInt, 0).getDate();
        if (dayInt > lastDayOfMonth) {
            return false;
        }


        // If all checks pass, the date is valid
        return true;
    }

    static getCurrentDate() {
        const currentDate = new Date();

        // Extract year, month, and day components
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        // Assemble the formatted date string in 'MM-DD-YYYY' format
        const formattedDate = `${month}-${day}-${year}`;

        return formattedDate;
    }

    static compareTwoDates(date1, date2) {
        let firstDate = date1.split("-")
        let secondDate = date2.split("-")
        //year validate
        if (Number(firstDate[2]) < Number(secondDate[2])) {
            return false
        }
        //day validate
        if (Number(firstDate[1]) <= Number(secondDate[1])) {
            return false
        }
        //month validate
        if (Number(firstDate[0]) < Number(secondDate[0])) {
            return false
        }
        return true
    }

}

module.exports = Helper;
