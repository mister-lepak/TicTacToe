// Module aliases
const { Engine, Render, Runner, World, Bodies, Events, Mouse, MouseConstraint } = Matter;

// Create an engine
const engine = Engine.create();

// Create an renderer
const worldHeight = 600;
const worldWidth = 600;
const { world } = engine;
const render = Render.create({
  element : document.body,
  engine  : engine,
  options : {
    height: worldHeight,
    width : worldWidth
  }
});

const gridSize = 3;
const boxWidth = worldWidth/gridSize;
const boxHeight = worldHeight/gridSize;

// Define and Create grid boxes
const grid = Array(gridSize)
              .fill(null)
              .map(() => Array(gridSize).fill(null));

const horizontalBase = (worldWidth, boxWidth, x) => {
  return (worldWidth / 3 * x) + (boxWidth / 2);
};

const verticalBase = (worldHeight, boxHeight, y) => {
  return (worldHeight / 3 * y) + (boxHeight / 2);
};

for ( i=0 ; i<gridSize ; i++ ){
  for ( j=0 ; j<gridSize ; j++ ){
    if (grid[i][j]) {}
    else {grid[i][j] = Bodies.rectangle(
      horizontalBase(worldWidth, boxWidth, j),
      verticalBase(worldHeight, boxHeight, i),
      boxWidth,
      boxHeight,
      {isStatic: true}
    )};
    // Add each grid to the world
    World.add(engine.world, grid[i][j]);


  };
};
const canvasMouse = Mouse.create(render.canvas);
const options = {
  mouse: canvasMouse
}
const mouseConstraint = MouseConstraint.create(engine, options);
Events.on(mouseConstraint, 'mouseup', () => {
  console.log('Hi');
});


// run the engine
Engine.run(engine);

// run the renderer
Render.run(render);
Runner.run(Runner.create(), engine);