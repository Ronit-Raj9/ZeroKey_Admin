export const AdPoolABI = [
    {
      "type": "constructor",
      "inputs": [
        { "name": "_usdc", "type": "address", "internalType": "address" },
        { "name": "_impressionCost", "type": "uint256", "internalType": "uint256" },
        { "name": "_minimumDeposit", "type": "uint256", "internalType": "uint256" },
        { "name": "_initialClaimer", "type": "address", "internalType": "address" }
      ],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "activeAdvertiserCount",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "activeQueue",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "authorizedClaimers",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "balances",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "claimImpression",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "currentAdvertiser",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "currentQueuePointer",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "dailyBudgetCap",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "dailySpent",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "dailySpentResetDay",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "deposit",
      "inputs": [{ "name": "amount", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "impressionCost",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "lifetimeImpressions",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "minimumDeposit",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    { "type": "function", "name": "pause", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "paused",
      "inputs": [],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "recoverERC20",
      "inputs": [
        { "name": "token", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "setAuthorizedClaimer",
      "inputs": [
        { "name": "claimer", "type": "address", "internalType": "address" },
        { "name": "authorized", "type": "bool", "internalType": "bool" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setDailyBudget",
      "inputs": [{ "name": "cap", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setImpressionCost",
      "inputs": [{ "name": "newCost", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setMinimumDeposit",
      "inputs": [{ "name": "newMin", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "totalImpressions",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    { "type": "function", "name": "unpause", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "usdc",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "contract IERC20" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "withdraw",
      "inputs": [{ "name": "amount", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "AdvertiserActivated",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "AdvertiserDepleted",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ClaimerUpdated",
      "inputs": [
        { "name": "claimer", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "authorized", "type": "bool", "indexed": false, "internalType": "bool" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "DailyBudgetCapSet",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "cap", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Deposited",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "newBalance", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ImpressionClaimed",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "advertiserBalance", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ImpressionCostUpdated",
      "inputs": [
        { "name": "oldCost", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "newCost", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "MinimumDepositUpdated",
      "inputs": [
        { "name": "oldMin", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "newMin", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Paused",
      "inputs": [{ "name": "account", "type": "address", "indexed": false, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Unpaused",
      "inputs": [{ "name": "account", "type": "address", "indexed": false, "internalType": "address" }],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Withdrawn",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "amount", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "newBalance", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "BelowMinimumDeposit", "inputs": [] },
    { "type": "error", "name": "DailyBudgetExceeded", "inputs": [] },
    { "type": "error", "name": "EnforcedPause", "inputs": [] },
    { "type": "error", "name": "ExpectedPause", "inputs": [] },
    { "type": "error", "name": "InsufficientBalance", "inputs": [] },
    { "type": "error", "name": "NoActiveAdvertiser", "inputs": [] },
    { "type": "error", "name": "NotAuthorizedClaimer", "inputs": [] },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [{ "name": "account", "type": "address", "internalType": "address" }]
    },
    { "type": "error", "name": "ReentrancyGuardReentrantCall", "inputs": [] },
    {
      "type": "error",
      "name": "SafeERC20FailedOperation",
      "inputs": [{ "name": "token", "type": "address", "internalType": "address" }]
    },
    { "type": "error", "name": "ZeroAddress", "inputs": [] },
    { "type": "error", "name": "ZeroAmount", "inputs": [] }
  ] as const;

export const AdRegistryABI = [
    { "type": "constructor", "inputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "approveCreative",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "approvedAdvertisers",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approvedCount",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "blockAdvertiser",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "blocked",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "creatives",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "tagline", "type": "string", "internalType": "string" },
        { "name": "sponsorName", "type": "string", "internalType": "string" },
        { "name": "targetTags", "type": "string", "internalType": "string" },
        { "name": "clickUrl", "type": "string", "internalType": "string" },
        { "name": "status", "type": "uint8", "internalType": "enum AdRegistry.Status" },
        { "name": "rejectionReason", "type": "string", "internalType": "string" },
        { "name": "submittedAt", "type": "uint256", "internalType": "uint256" },
        { "name": "updatedAt", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getAsciiArt",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "string[]", "internalType": "string[]" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "getCreative",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "asciiLines", "type": "string[]", "internalType": "string[]" },
        { "name": "tagline", "type": "string", "internalType": "string" },
        { "name": "sponsorName", "type": "string", "internalType": "string" },
        { "name": "targetTags", "type": "string", "internalType": "string" },
        { "name": "clickUrl", "type": "string", "internalType": "string" },
        { "name": "status", "type": "uint8", "internalType": "enum AdRegistry.Status" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "isActive",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "moderators",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    { "type": "function", "name": "pauseCampaign", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "pendingCount",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "pendingQueue",
      "inputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "rejectCreative",
      "inputs": [
        { "name": "advertiser", "type": "address", "internalType": "address" },
        { "name": "reason", "type": "string", "internalType": "string" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "setModerator",
      "inputs": [
        { "name": "moderator", "type": "address", "internalType": "address" },
        { "name": "authorized", "type": "bool", "internalType": "bool" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "submitCreative",
      "inputs": [
        { "name": "asciiLines", "type": "string[]", "internalType": "string[]" },
        { "name": "tagline", "type": "string", "internalType": "string" },
        { "name": "sponsorName", "type": "string", "internalType": "string" },
        { "name": "targetTags", "type": "string", "internalType": "string" },
        { "name": "clickUrl", "type": "string", "internalType": "string" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    { "type": "function", "name": "unpauseCampaign", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "updateMetadata",
      "inputs": [
        { "name": "tagline", "type": "string", "internalType": "string" },
        { "name": "targetTags", "type": "string", "internalType": "string" },
        { "name": "clickUrl", "type": "string", "internalType": "string" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "AdvertiserBlocked",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CreativeApproved",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CreativePaused",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CreativeRejected",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "reason", "type": "string", "indexed": false, "internalType": "string" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CreativeSubmitted",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "CreativeUpdated",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ModeratorUpdated",
      "inputs": [
        { "name": "moderator", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "authorized", "type": "bool", "indexed": false, "internalType": "bool" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "AdvertiserBlocked_", "inputs": [] },
    { "type": "error", "name": "CreativeNotApproved", "inputs": [] },
    { "type": "error", "name": "EmptyCreative", "inputs": [] },
    { "type": "error", "name": "NoCreativeFound", "inputs": [] },
    { "type": "error", "name": "NotModerator", "inputs": [] },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [{ "name": "account", "type": "address", "internalType": "address" }]
    },
    { "type": "error", "name": "SponsorNameTooLong", "inputs": [] },
    { "type": "error", "name": "TaglineTooLong", "inputs": [] }
  ] as const;

export const ReputationOracleABI = [
    {
      "type": "constructor",
      "inputs": [{ "name": "initialReporter", "type": "address", "internalType": "address" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "advertiserRep",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "totalDeposited", "type": "uint256", "internalType": "uint256" },
        { "name": "totalImpressions", "type": "uint256", "internalType": "uint256" },
        { "name": "campaignsRun", "type": "uint256", "internalType": "uint256" },
        { "name": "fraudFlags", "type": "uint256", "internalType": "uint256" },
        { "name": "firstSeenAt", "type": "uint256", "internalType": "uint256" },
        { "name": "lastActiveAt", "type": "uint256", "internalType": "uint256" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "advertiserScore",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "authorizedReporters",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "flagAdvertiser",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "flagUser",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "isThrottled",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "owner",
      "inputs": [],
      "outputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "recordCampaign",
      "inputs": [{ "name": "advertiser", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "recordClaim",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "recordDeposit",
      "inputs": [
        { "name": "advertiser", "type": "address", "internalType": "address" },
        { "name": "amount", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "recordPayment",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    { "type": "function", "name": "renounceOwnership", "inputs": [], "outputs": [], "stateMutability": "nonpayable" },
    {
      "type": "function",
      "name": "setReporter",
      "inputs": [
        { "name": "reporter", "type": "address", "internalType": "address" },
        { "name": "authorized", "type": "bool", "internalType": "bool" }
      ],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "setThrottleThreshold",
      "inputs": [{ "name": "threshold", "type": "uint256", "internalType": "uint256" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "throttleThreshold",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transferOwnership",
      "inputs": [{ "name": "newOwner", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "unthrottleUser",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "userRep",
      "inputs": [{ "name": "", "type": "address", "internalType": "address" }],
      "outputs": [
        { "name": "totalClaims", "type": "uint256", "internalType": "uint256" },
        { "name": "totalPayments", "type": "uint256", "internalType": "uint256" },
        { "name": "fraudFlags", "type": "uint256", "internalType": "uint256" },
        { "name": "firstSeenAt", "type": "uint256", "internalType": "uint256" },
        { "name": "lastActiveAt", "type": "uint256", "internalType": "uint256" },
        { "name": "throttled", "type": "bool", "internalType": "bool" }
      ],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "userScore",
      "inputs": [{ "name": "user", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "event",
      "name": "AdvertiserSignal",
      "inputs": [
        { "name": "advertiser", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "signalType", "type": "string", "indexed": false, "internalType": "string" },
        { "name": "value", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "OwnershipTransferred",
      "inputs": [
        { "name": "previousOwner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "newOwner", "type": "address", "indexed": true, "internalType": "address" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "ReporterUpdated",
      "inputs": [
        { "name": "reporter", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "authorized", "type": "bool", "indexed": false, "internalType": "bool" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserSignal",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "signalType", "type": "string", "indexed": false, "internalType": "string" },
        { "name": "value", "type": "uint256", "indexed": false, "internalType": "uint256" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserThrottled",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "UserUnthrottled",
      "inputs": [
        { "name": "user", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "timestamp", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    { "type": "error", "name": "NotAuthorizedReporter", "inputs": [] },
    {
      "type": "error",
      "name": "OwnableInvalidOwner",
      "inputs": [{ "name": "owner", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "OwnableUnauthorizedAccount",
      "inputs": [{ "name": "account", "type": "address", "internalType": "address" }]
    }
  ] as const;

export const ERC20_ABI = [
    {
      "type": "function",
      "name": "allowance",
      "inputs": [
        { "name": "owner", "type": "address", "internalType": "address" },
        { "name": "spender", "type": "address", "internalType": "address" }
      ],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "approve",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "balanceOf",
      "inputs": [{ "name": "account", "type": "address", "internalType": "address" }],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "decimals",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint8", "internalType": "uint8" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "name",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "symbol",
      "inputs": [],
      "outputs": [{ "name": "", "type": "string", "internalType": "string" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "totalSupply",
      "inputs": [],
      "outputs": [{ "name": "", "type": "uint256", "internalType": "uint256" }],
      "stateMutability": "view"
    },
    {
      "type": "function",
      "name": "transfer",
      "inputs": [
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "function",
      "name": "transferFrom",
      "inputs": [
        { "name": "from", "type": "address", "internalType": "address" },
        { "name": "to", "type": "address", "internalType": "address" },
        { "name": "value", "type": "uint256", "internalType": "uint256" }
      ],
      "outputs": [{ "name": "", "type": "bool", "internalType": "bool" }],
      "stateMutability": "nonpayable"
    },
    {
      "type": "event",
      "name": "Approval",
      "inputs": [
        { "name": "owner", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "spender", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "value", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "event",
      "name": "Transfer",
      "inputs": [
        { "name": "from", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "to", "type": "address", "indexed": true, "internalType": "address" },
        { "name": "value", "type": "uint256", "indexed": false, "internalType": "uint256" }
      ],
      "anonymous": false
    },
    {
      "type": "error",
      "name": "ERC20InsufficientAllowance",
      "inputs": [
        { "name": "spender", "type": "address", "internalType": "address" },
        { "name": "allowance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InsufficientBalance",
      "inputs": [
        { "name": "sender", "type": "address", "internalType": "address" },
        { "name": "balance", "type": "uint256", "internalType": "uint256" },
        { "name": "needed", "type": "uint256", "internalType": "uint256" }
      ]
    },
    {
      "type": "error",
      "name": "ERC20InvalidApprover",
      "inputs": [{ "name": "approver", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC20InvalidReceiver",
      "inputs": [{ "name": "receiver", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSender",
      "inputs": [{ "name": "sender", "type": "address", "internalType": "address" }]
    },
    {
      "type": "error",
      "name": "ERC20InvalidSpender",
      "inputs": [{ "name": "spender", "type": "address", "internalType": "address" }]
    }
  ] as const;
