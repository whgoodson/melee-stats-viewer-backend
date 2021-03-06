const mongoose = require('mongoose');
const random = require('mongoose-simple-random');

const GameSchema = mongoose.Schema({
    metadata: {
        startAt: Date,
        lastFrame: Number,
        players: {
            0: {
                names: {
                    netplay: String, code: String
                },
            },
            1: {
                names: {
                    netplay: String, code: String
                }
            },
        },
        playedOn: String
    },
    settings: {
        slpVersion: String,
        stageId: Number,
        players: [
            {
                playerIndex: Number,
                port: Number,                   // playerIndex + 1
                characterId: Number,
                characterColor: Number,
                startStocks: Number,
                controllerFix: String,
                nametag: String
            }
        ]
    },
    frames: [
        {
            frame: Number,
            players: [
                {
                    pre: {
                        frame: Number,
                        playerIndex: Number,
                        isFollower: Boolean,
                        seed: Number,
                        actionStateId: Number,
                        positionX: Number,
                        positionY: Number,
                        facingDirection: Number,        // -1 = left, +1 = right
                        percent: Number
                    },
                    post: {
                        frame: Number,
                        playerIndex: Number,
                        isFollower: Boolean,
                        actionStateId: Number,
                        positionX: Number,
                        positionY: Number,
                        facingDirection: Number,        // -1 = left, +1 = right
                        percent: Number,
                        lastAttackLanded: String,
                        currentComboCount: Number,
                        lastHitBy: String,
                        stocksRemaining: Number,
                        actionStateCounter: Number,
                    }
                }
            ]
        }
    ],
    stats: {
        lastFrame: Number,
        playableFrameCount: Number,
        stocks: [
            {
                playerIndex: Number,
                opponentIndex: Number,
                startFrame: Number,
                endFrame: Number,
                startPercent: Number,
                endPercent: Number,
                currentPercent: Number,
                count: Number
            }
        ],
        // conversions: [
        //     {
        //         playerIndex: Number,
        //         opponentIndex: Number,
        //         startFrame: Number,
        //         endFrame: Number,
        //         startPercent: Number,
        //         currentPercent: Number,
        //         endPercent: Number,
        //         moves: [
        //             {
        //                 frame: Number,
        //                 moveId: Number,
        //                 // moveName: String,
        //                 hitCount: Number,
        //                 damage: Number,
        //             }
        //         ],
        //         didKill: Boolean,
        //         openingType: String,
        //     }
        // ],
        combos: [
            {
                playerIndex: Number,
                opponentIndex: Number,
                startFrame: Number,
                endFrame: Number,
                startPercent: Number,
                currentPercent: Number,
                endPercent: Number,
                moves: [
                    {
                        frame: Number,
                        moveId: Number,
                        hitCount: Number,
                        damage: Number,
                    }
                ],
                didKill: Boolean,
            }
        ],
        actionCounts: [
            {
                playerIndex: Number,
                opponentIndex: Number,
                wavedashCount: Number,
                wavelandCount: Number,
                airDodgeCount: Number,
                dashDanceCount: Number,
                spotDodgeCount: Number,
                ledgegrabCount: Number,
                rollCount: Number
            }
        ],
        overall: [
            {
                playerIndex: Number,
                opponentIndex: Number,
                inputCounts: {
                    buttons: Number,
                    triggers: Number,
                    cstick: Number,
                    joystick: Number,
                    total: Number
                },
                conversionCount: Number,
                totalDamage: Number,
                killCount: Number,
                successfulConversions: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                inputsPerMinute: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                digitalInputsPerMinute: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                openingsPerKill: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                damagePerOpening: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                neutralWinRatio: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                counterHitRatio: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
                beneficialTradeRatio: {
                    count: Number,
                    total: Number,
                    ratio: Number
                },
            }
        ],
        gameComplete: Boolean
    },
    uploadTime: { type: Date, default: Date.now },
    // (external reference) players: [{ player1: mongoose.Types.ObjectId }, { player2: mongoose.Types.ObjectId }]
});
GameSchema.plugin(random);

module.exports = mongoose.model('Game', GameSchema);
