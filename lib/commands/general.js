import { errors } from 'appium-base-driver';
import _ from 'lodash';
import log from '../logger';

let commands = {};

commands.getPageSource = async function () {

    let source;

    source = await this.executeSocketCommand('GetSRC');

    if (source) {
        return source.toString();
    } else {
        // this should never happen but we've received bug reports; this will help us track down
        // what's wrong in getTreeForXML
        throw new Error("Bad response from getTreeForXML");
    }
};

export default commands;
