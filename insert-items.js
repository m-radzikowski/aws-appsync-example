'use strict';

const awsProvider = serverless.getProvider('aws');

const Converter = require('aws-sdk/clients/dynamodb').Converter;

const main = async () => {
    const stackResources = await listStackResources();
    const tableName = getPhysicalId(stackResources, 'DynamoTable');

    await awsProvider.request('DynamoDB', 'batchWriteItem', {
        RequestItems: {
            [tableName]: [
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'POST',
                            sk: '2afb9edf-0d86-4069-8bbb-6a4b66bd91c8',
                            data: 'published#2021-05-14T10:00:00Z',
                            title: 'Why AWS is the best',
                            authorId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            categoryId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'POST',
                            sk: '1f1e8a1d-0f19-422d-bb13-c384fbc90dfb',
                            data: 'published#2021-05-15T13:00:00Z',
                            title: 'Why Azure sucks',
                            authorId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            categoryId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'POST',
                            sk: '3e75d44d-c962-4282-9219-6c12deb5e4fc',
                            data: 'published#2021-05-17T18:00:00Z',
                            title: 'GCP is maybe OK',
                            authorId: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            categoryId: '35522ae9-d79e-433f-83ab-a08e4262be50',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'POST',
                            sk: 'c4ebc4b8-621e-424e-8bbb-459164f85064',
                            data: 'published#2021-05-17T20:00:00Z',
                            title: '17 ways to run containers on AWS',
                            authorId: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            categoryId: 'aad51e6b-43c6-421c-a942-5c41f0ad0ca3',
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'AUTHOR',
                            sk: 'bff01213-afb0-4d0f-913c-5a8e2f0c4ed9',
                            name: 'John Doe',
                            image: {
                                fullSize: 'http://example.com/john-big.png',
                                thumbnail: 'http://example.com/john-thumbnail.png',
                            },
                        })
                    }
                },
                {
                    PutRequest: {
                        Item: Converter.marshall({
                            pk: 'AUTHOR',
                            sk: '2cefaf75-55d4-474d-8fcd-86dfd6cc3db5',
                            name: 'Jane Doe',
                            image: {
                                fullSize: 'http://example.com/jane-big.png',
                                thumbnail: 'http://example.com/jane-thumbnail.png',
                            },
                        })
                    }
                },
            ]
        }
    });
};

const listStackResources = async (resources, nextToken) => {
    resources = resources || [];
    const response = await awsProvider.request('CloudFormation', 'listStackResources', {
        StackName: awsProvider.naming.getStackName(),
        NextToken: nextToken,
    });
    resources.push(...response.StackResourceSummaries);

    if (response.NextToken) {
        return listStackResources(resources, response.NextToken);
    }

    return resources;
};

const getPhysicalId = (stackResources, logicalId) => {
    return stackResources.find(r => r.LogicalResourceId === logicalId).PhysicalResourceId || '';
};

main()
    .catch(e => {
        console.error(e);
        throw e;
    });
