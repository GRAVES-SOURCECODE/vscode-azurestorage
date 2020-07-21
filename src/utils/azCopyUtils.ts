/*---------------------------------------------------------------------------------------------
 *  Copyright (c) Microsoft Corporation. All rights reserved.
 *  Licensed under the MIT License. See License.md in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

import { AzCopyLocation, IAzCopyClient, ICopyOptions, TransferStatus } from "se-az-copy";
import { TransferProgress } from "../TransferProgress";

export async function startAndWaitForCopy(copyClient: IAzCopyClient, src: AzCopyLocation, dst: AzCopyLocation, options: ICopyOptions, transferProgress: TransferProgress): Promise<string> {
    let jobId: string = await copyClient.copy(src, dst, options);
    let status: TransferStatus | undefined;
    while (!status || status.StatusType !== "EndOfJob") {
        status = (await copyClient.getJobInfo(jobId)).latestStatus;
        transferProgress.reportToOutputWindow(status ? status.BytesOverWire : 0);
        // tslint:disable-next-line: no-string-based-set-timeout
        await new Promise((resolve, _reject) => setTimeout(resolve, 1000));
    }

    return jobId;
}
