module.exports = class CucumberContext{

    static get(key){
        return this._context[key];
    }

    static add(key, value){
        this._context[key] = value;
    }

    static _context = {}
}
