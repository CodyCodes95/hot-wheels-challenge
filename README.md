
# [Hot Wheels]

### Problem
As an avid vroom vroom enthusiast, your employer has tasked you with taking the first step towards the company's new direction of investing in street racing. The company would prefer to use AI but doesn't have the cash flow to invest so instead they want their junior developer to write a terminal program that will help their employees predict the outcome of a race between a real user two randomly selected racers.

The outcome can be predicted by the performance of the car and the skill of the racer. A skilled racer in a moderate care can beat a unskilled racer in a high performance car but the best racer isn't going to be winning any races driving a fiat.

### Solution
Given the resources below (add more for flavour), write a program that will allow a user of this program to sign in and choose their modifications within their budget and race against other random racers with random modifications. Given that this program should be a predicative tool, the outcome of race should be predicted by the program and the signed in user with the racer's skills and modifications visible when placing a prediction.

The boss will be happy with the program when he can race multiple times, make predictions against the program and is happy when the program and he are both correct,because learning is fun.


```json
mods
{
    "tire": [
        {"name": "really good tyres", "price": 100, "performance": 2},
        {"name": "moderate tyres", "price": 100, "performance": 1},
        {"name": "cheap and nasty tyres", "price": 20, "performance": 0.5}
    ],
    "motor": [
        {"name": "really good motor", "price": 100, "performance": 2},
        {"name": "moderate motor", "price": 50, "performance": 1},
        {"name": "horrible motor", "price": 5, "performance": 0.5},
    ],
}

racers
[
    {"username": "johncena", "skill": 1},
    {"username": "jean-luc", "skill": 1.5},
    {"username": "mcQueen", "skill": 2},
    {"username": "noobslayer", "skill": 2},
]
```