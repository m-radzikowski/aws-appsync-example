/* eslint-disable @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access */
import Parser from 'appsync-template-tester';
import {loadMatchingTemplate} from './util';

const template = loadMatchingTemplate(__filename);
const parser = new Parser(template);

it('returns posts with extracted fields', () => {
    const context = {
        result: {
            items: [
                {
                    pk: 'POST',
                    sk: 'qwe123',
                    data: 'published#2021-05-28T10:00:00Z',
                    title: 'Lorem ipsum',
                },
            ],
        },
    };

    const response = parser.resolve(context);

    expect(response.posts[0]).toEqual(expect.objectContaining({
        id: 'qwe123',
        published: true,
        publishedAt: '2021-05-28T10:00:00Z',
        title: 'Lorem ipsum',
    }));
});
