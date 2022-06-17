
class Dictionary {

    constructor(dictionaryRef) {
        this.dictionary = dictionaryRef;
    }

    getWord(key) {
        if (!!!this.dictionary || !this.dictionary.hasOwnProperty(key)) {
            return key;
        } else {
            return this.dictionary[key];
        }
    }
}

export default Dictionary;