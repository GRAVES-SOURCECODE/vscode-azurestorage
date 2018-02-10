/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.txt in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { QueueNode } from './queueNode';
import { storageExplorerLauncher } from '../../storageExplorerLauncher/storageExplorerLauncher';
import { IAzureNode, AzureActionHandler } from 'vscode-azureextensionui';

export function registerQueueActionHandlers(actionHandler: AzureActionHandler) {
    actionHandler.registerCommand("azureStorage.openQueue", openQueueInStorageExplorer);
    actionHandler.registerCommand("azureStorage.deleteQueue", (node) => node.deleteNode());
}

function openQueueInStorageExplorer(node: IAzureNode<QueueNode>) {
    var resourceId = node.treeItem.storageAccount.id;
    var subscriptionid = node.subscription.subscriptionId;
    var resourceType = "Azure.Queue";
    var resourceName = node.treeItem.queue.name;

    storageExplorerLauncher.openResource(resourceId, subscriptionid, resourceType, resourceName);
}