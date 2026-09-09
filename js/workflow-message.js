export const _messagePayloadOptions = async payload => {
    const files = payload && payload.files;
    if (!files || files.length === 0) {
        const { files: _ignored, ...rest } = payload || {};
        return { dataJ: rest };
    }
    const dataM = { body: payload.body || "" };
    dataM.files = await Promise.all(
        files.map(async file => [
            file.name || "file",
            file.type || "application/octet-stream",
            new Uint8Array(await file.arrayBuffer())
        ])
    );
    return { dataM: dataM };
};
