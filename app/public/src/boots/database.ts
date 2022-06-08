// const Datastore = require('nedb');
import * as Datastore from "nedb";

const users = new Datastore('/Users/junyoungkim/Desktop/junyoung/app/source/electron/db/users.db');

users.loadDatabase();