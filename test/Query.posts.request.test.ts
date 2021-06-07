/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import Parser from 'appsync-template-tester';
import {loadMatchingTemplate} from './util';

const template = loadMatchingTemplate(__filename);
const parser = new Parser(template);

it('builds query with default params', () => {
    const context = {};

    const response = parser.resolve(context);

    expect(response).toStrictEqual({
        version: '2017-02-28',
        operation: 'Query',
        index: 'gsi1',
        query: {
            expression: 'pk = :pk',
            expressionValues: {
                ':pk': {
                    S: 'POST'
                }
            }
        },
        limit: 10,
    });
});

it('builds query with given limit', () => {
    const context = {
        arguments: {
            limit: 5,
        },
    };

    const response = parser.resolve(context);

    expect(response.limit).toBe(5);
});
