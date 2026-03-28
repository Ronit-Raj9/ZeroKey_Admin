export const AdPoolABI = [
    { name: "claimImpression", type: "function", stateMutability: "nonpayable", inputs: [{ name: "user", type: "address" }], outputs: [] },
    { name: "deposit", type: "function", stateMutability: "nonpayable", inputs: [{ name: "amount", type: "uint256" }], outputs: [] },
    { name: "withdraw", type: "function", stateMutability: "nonpayable", inputs: [{ name: "amount", type: "uint256" }], outputs: [] },
    { name: "setImpressionCost", type: "function", stateMutability: "nonpayable", inputs: [{ name: "newCost", type: "uint256" }], outputs: [] },
    { name: "setAuthorizedClaimer", type: "function", stateMutability: "nonpayable", inputs: [{ name: "newClaimer", type: "address" }], outputs: [] },
    { name: "setMinimumDeposit", type: "function", stateMutability: "nonpayable", inputs: [{ name: "newMin", type: "uint256" }], outputs: [] },
    { name: "pause", type: "function", stateMutability: "nonpayable", inputs: [], outputs: [] },
    { name: "unpause", type: "function", stateMutability: "nonpayable", inputs: [], outputs: [] },
    { name: "setDailyBudget", type: "function", stateMutability: "nonpayable", inputs: [{ name: "maxDaily", type: "uint256" }], outputs: [] },
    { name: "currentAdvertiser", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "address" }] },
    { name: "activeAdvertiserCount", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
    { name: "balances", type: "function", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
    { name: "totalImpressions", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
    { name: "impressionCost", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
    { name: "minimumDeposit", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
    { name: "authorizedClaimer", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "address" }] },
    { name: "paused", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "bool" }] },
    { name: "owner", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "address" }] },
    { name: "lifetimeImpressions", type: "function", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
    { name: "dailyBudgets", type: "function", stateMutability: "view", inputs: [{ name: "", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
    { name: "ImpressionClaimed", type: "event", inputs: [{ name: "user", type: "address", indexed: true }, { name: "amount", type: "uint256", indexed: false }, { name: "advertiser", type: "address", indexed: true }, { name: "timestamp", type: "uint256", indexed: false }, { name: "advertiserBalance", type: "uint256", indexed: false }] },
    { name: "Deposited", type: "event", inputs: [{ name: "advertiser", type: "address", indexed: true }, { name: "amount", type: "uint256", indexed: false }, { name: "newBalance", type: "uint256", indexed: false }, { name: "timestamp", type: "uint256", indexed: false }] },
    { name: "Withdrawn", type: "event", inputs: [{ name: "advertiser", type: "address", indexed: true }, { name: "amount", type: "uint256", indexed: false }, { name: "remainingBalance", type: "uint256", indexed: false }, { name: "timestamp", type: "uint256", indexed: false }] },
    { name: "AdvertiserDepleted", type: "event", inputs: [{ name: "advertiser", type: "address", indexed: true }, { name: "totalServed", type: "uint256", indexed: false }, { name: "timestamp", type: "uint256", indexed: false }] },
] as const;

export const AdRegistryABI = [
    { name: "getCreative", type: "function", stateMutability: "view", inputs: [{ name: "advertiser", type: "address" }], outputs: [{ name: "asciiLines", type: "string[]" }, { name: "tagline", type: "string" }, { name: "sponsorName", type: "string" }, { name: "targetTags", type: "string" }, { name: "clickUrl", type: "string" }, { name: "status", type: "uint8" }] },
    { name: "getAsciiArt", type: "function", stateMutability: "view", inputs: [{ name: "advertiser", type: "address" }], outputs: [{ name: "", type: "string[]" }] },
    { name: "isActive", type: "function", stateMutability: "view", inputs: [{ name: "advertiser", type: "address" }], outputs: [{ name: "", type: "bool" }] },
    { name: "approveCreative", type: "function", stateMutability: "nonpayable", inputs: [{ name: "advertiser", type: "address" }], outputs: [] },
    { name: "rejectCreative", type: "function", stateMutability: "nonpayable", inputs: [{ name: "advertiser", type: "address" }, { name: "reason", type: "string" }], outputs: [] },
    { name: "pendingCount", type: "function", stateMutability: "view", inputs: [], outputs: [{ name: "", type: "uint256" }] },
    { name: "CreativeSubmitted", type: "event", inputs: [{ name: "advertiser", type: "address", indexed: true }, { name: "tagline", type: "string", indexed: false }, { name: "timestamp", type: "uint256", indexed: false }] },
    { name: "CreativeApproved", type: "event", inputs: [{ name: "advertiser", type: "address", indexed: true }, { name: "timestamp", type: "uint256", indexed: false }] },
] as const;

export const ReputationOracleABI = [
    { name: "userScore", type: "function", stateMutability: "view", inputs: [{ name: "user", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
    { name: "advertiserScore", type: "function", stateMutability: "view", inputs: [{ name: "advertiser", type: "address" }], outputs: [{ name: "", type: "uint256" }] },
    { name: "isThrottled", type: "function", stateMutability: "view", inputs: [{ name: "user", type: "address" }], outputs: [{ name: "", type: "bool" }] },
    { name: "flagUser", type: "function", stateMutability: "nonpayable", inputs: [{ name: "user", type: "address" }], outputs: [] },
] as const;
