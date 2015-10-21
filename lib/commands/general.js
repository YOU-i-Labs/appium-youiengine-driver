import { errors } from 'mobile-json-wire-protocol';
import _ from 'lodash';
import log from '../logger';

let commands = {};

commands.getPageSource = async function () {

    return await this.getSourceForElementForXML();

};

export default commands;

