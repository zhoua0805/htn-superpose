const posenet = require('@tensorflow-models/posenet')

var flipHorizontal = false;

var imageElement1 = document.getElementById('test1');
var imageElement2 = document.getElementById('test2');

function dotProduct(vec1, vec2) {
    let sum = 0;
    for (let i = 0; i < vec1.length; i++){
        sum += vec1[i] * vec2[i]
    };
    return sum;
}

function magnitude(vec) {
    let dpt = dotProduct(vec, vec);
    return Math.sqrt(dpt);
}

function L2Distance(vec1, vec2) {
    let dpt = dotProduct(vec1, vec2);
    return Math.sqrt(2*(1-dpt));
}

async function getSimilarity() {
    let vec1 = await posenet.load().then(function(net) {
        const pose1 = net.estimateSinglePose(imageElement1, {
            flipHorizontal: true
        });
        return pose1;
    }).then(function(pose1){
        let positions1 = [];
        for (let keypoints in pose1){
            for (let part in pose1[keypoints]){
                for (position in pose1[keypoints][part]){
                    positions1.push(pose1[keypoints][part][position]['x']);
                    positions1.push(pose1[keypoints][part][position]['y']);
                }
            }
        };
        positions1 = positions1.filter(function(e) {
            return e !== undefined;
        });
        positions1 = positions1.map(i => i / magnitude(positions1))
        return positions1
    });

    let vec2 = await posenet.load().then(function(net) {
        const pose2 = net.estimateSinglePose(imageElement2, {
            flipHorizontal: true
        });
        return pose2;
    }).then(function(pose2){
        let positions2 = [];
        for (let keypoints in pose2){
            for (let part in pose2[keypoints]){
                for (position in pose2[keypoints][part]){
                    positions2.push(pose2[keypoints][part][position]['x']);
                    positions2.push(pose2[keypoints][part][position]['y']);
                }
            }
        };
        positions2 = positions2.filter(function(e) {
            return e !== undefined;
        });
        positions2 = positions2.map(i => i / magnitude(positions2))
        return positions2;
    });
    const result = L2Distance(vec1, vec2);
    console.log(result)
    console.log(vec1)
    console.log(vec2)
}

getSimilarity()