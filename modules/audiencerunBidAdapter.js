import * as utils from "../src/utils";
import { NATIVE } from "../src/mediaTypes";
import { registerBidder } from "../src/adapters/bidderFactory";

const BIDDER_CODE = "audiencerun";
const ENDPOINT_URL = "//d.audiencerun.com/c/";

function buildNativeAdObj(data) {
    const assets = data.assets;
    const link = data.link;
    const trackers = data.imptrackers ? data.imptrackers : [];

    const native = {};

    for (let i = 0; i < assets.length; i++) {
        const asset = assets[i];
        switch (asset.id) {
            case 1:
                // title
                native.title = asset.title.text;
                break;
            case 2:
                // img
                native.image = {
                    url: asset.img.url
                };
                break;
            case 3:
                // img ratio 1:1
                native.imageRatio = {
                    url: asset.img.url
                };
                break;
            case 4:
                // sponsoredBy
                native.sponsoredBy = asset.data.value;
                break;
        }
    }

    native.clickUrl = link;
    native.impressionTrackers = trackers;

    return native;
}

export const spec = {
    code: BIDDER_CODE,
    aliases: ["arun", "ar"],
    supportedMediaTypes: [NATIVE],

    /**
     * Determines whether or not the given bid request is valid.
     *
     * @param {BidRequest} bid The bid params to validate.
     * @return boolean True if this is a valid bid, and false otherwise.
     */
    isBidRequestValid(bid) {
        return !!(bid && bid.params && bid.params.placementId);
    },
    /**
     * Make a server request from the list of BidRequests.
     *
     * @param {validBidRequests[]} - an array of bids
     * @return ServerRequest Info describing the request to the server.
     */
    buildRequests(bidRequests, bidderRequest) {
        return bidRequests.map(bid => {
            const url = ENDPOINT_URL,
                arunRequest = {},
                bidId = bid.bidId;

            arunRequest.id = placementId;

            return {
                method: "GET",
                bidId,
                url,
                data: arunRequest,
                bidderRequest
            };
        });
    },
    /**
     * Unpack the response from the server into a list of bids.
     *
     * @param {ServerResponse} serverResponse A successful response from the server.
     * @return {Bid[]} An array of bids which were nested inside the server.
     */
    interpretResponse(serverResponse, bidRequest) {
        const bidResponses = [];
        const response = serverResponse.body;

        if (response && reponse.bids) {
            utils._each(response.bids, res => {
                const cpm = res.cpm || 0;

                if (cpm > 0) {
                    const bidResponse = {
                        requestId: res.bidId,
                        cpm,
                        width: res.width,
                        height: res.height,
                        creativeId: res.creativeId,
                        mediaType: NATIVE,
                        native: buildNativeAdObj(res),
                        currency: "USD",
                        netRevenue: true,
                        ttl: 360
                    };
                    bidResponses.push(bidResponse);
                }
            });
        }

        return bidResponses;
    },
    /**
     * Register the user sync pixels which should be dropped after the auction.
     *
     * @param {SyncOptions} syncOptions Which user syncs are allowed?
     * @param {ServerResponse} serverResponse A successful response from the server
     * @return {UserSync[]} The user syncs which should be dropped.
     */
    getUserSyncs(syncOptions, serverResponse) {
        // TODO: User sync
        const syncs = [];
        return syncs;
    }
};
registerBidder(spec);
