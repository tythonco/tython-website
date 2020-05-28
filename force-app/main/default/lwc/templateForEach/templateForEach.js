import { LightningElement, api } from 'lwc';

export default class TemplateForEach extends LightningElement {
    itemCount = 10000;

    @api
    get items() {
        var ret = [];
        var i = 0;
        while (i < this.itemCount) {
            ret.push({ name: '' + i, value: i });
            i++;
        }
        this.startTime = new Date();
        return ret;
    }
}
