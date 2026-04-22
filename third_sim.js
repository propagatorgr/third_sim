// =====================================
// ΠΡΟΣΟΜΟΙΩΣΗ ΙΣΟΡΡΟΠΙΑΣ ΣΩΜΑΤΩΝ Α & Β
// με TOGGLES & ΧΡΩΜΑΤΑ ΔΡΑΣΗΣ–ΑΝΤΙΔΡΑΣΗΣ
// =====================================

// σταθερά βαρύτητας
const g = 10;

// κλίμακα δύναμης -> pixels
const scaleF = 5;

// sliders
let sliderA, sliderB;

// toggles
let toggleA, toggleB, toggleGround;

function setup() {
  createCanvas(windowWidth, 720);

  sliderA = createSlider(0, 5, 2, 0.1);
  sliderA.position(40, height - 90);

  sliderB = createSlider(0, 5, 3, 0.1);
  sliderB.position(40, height - 60);

  toggleA = createCheckbox("Δυνάμεις στο σώμα Α", true);
  toggleA.position(500, height - 90);

  toggleB = createCheckbox("Δυνάμεις στο σώμα Β", true);
  toggleB.position(500, height - 65);

  toggleGround = createCheckbox("Δυνάμεις στο έδαφος", true);
  toggleGround.position(500, height - 40);
}

function windowResized() {
  resizeCanvas(windowWidth, 720);
}


function draw() {
  background(255);

  // ===============================
  // ΜΑΖΕΣ
  // ===============================
  let mA = sliderA.value();
  let mB = sliderB.value();

  // ===============================
  // ΔΥΝΑΜΕΙΣ
  // ===============================
  let WA = mA * g;
  let WB = mB * g;

  let NA  = WA;        // στο σώμα Α
  let NAp = NA;        // από Α στο Β

  let NB  = WA + WB;   // από έδαφος στο Β
  let NBp = NB;        // από Β στο έδαφος

  // ===============================
  // ΓΕΩΜΕΤΡΙΑ
  // ===============================
  let groundY = 400;

  let blockB = { x: 180, y: groundY - 80, w: 320, h: 80 };
  let blockA = { x: 330, y: blockB.y - 80, w: 160, h: 80 };

  let centerA = {
    x: blockA.x + blockA.w / 2,
    y: blockA.y + blockA.h / 2
  };

  let centerB = {
    x: blockB.x + blockB.w / 2,
    y: blockB.y + blockB.h / 2
  };

  // ===============================
  // ΕΔΑΦΟΣ
  // ===============================
  stroke(0);
  strokeWeight(2);
  line(50, groundY, width - 50, groundY);

  // ===============================
  // ΣΩΜΑΤΑ
  // ===============================
  noFill();
  strokeWeight(2);
  rect(blockB.x, blockB.y, blockB.w, blockB.h);
  rect(blockA.x, blockA.y, blockA.w, blockA.h);

  fill(0);
  textSize(14);
  text("B", blockB.x + 8, blockB.y + 18);
  text("A", blockA.x + 8, blockA.y + 18);

  // ===============================
  // ΤΕΛΕΙΕΣ ΚΕΝΤΡΩΝ ΜΑΖΑΣ
  // ===============================
  noStroke();
  fill(0);
  circle(centerA.x, centerA.y, 6);
  circle(centerB.x, centerB.y, 6);

  // ===============================
  // ΔΙΑΝΥΣΜΑΤΑ ΜΕ TOGGLES
  // ===============================

  // --- Σώμα Α ---
  if (toggleA.checked()) {
    drawVector(centerA.x, centerA.y, 0,  WA * scaleF, "W_A", color(0));
    drawVector(centerA.x, centerA.y, 0, -NA * scaleF, "N_A", color(0, 150, 0)); // πράσινο
  }

  // --- Σώμα Β ---
  if (toggleB.checked()) {
    drawVector(centerB.x, centerB.y, 0,  WB  * scaleF, "W_B", color(0));
    drawVector(centerB.x, centerB.y, 0,  NAp * scaleF, "N'_A", color(0, 150, 0)); // πράσινο
    drawVector(centerB.x, centerB.y, 0, -NB  * scaleF, "N_B", color(200, 0, 0)); // κόκκινο
  }

  // --- Έδαφος ---
  if (toggleGround.checked()) {
    drawVector(
      centerB.x + 120,
      groundY,
      0,
      NBp * scaleF,
      "N'_B",
      color(200, 0, 0) // κόκκινο
    );
  }

  // ===============================
  // ΕΝΔΕΙΞΕΙΣ
  // ===============================
  noStroke();
  fill(0);
  text(
    `m_A = ${mA.toFixed(1)} kg    m_B = ${mB.toFixed(1)} kg`,
    40,
    height - 20
  );
}

// ===============================
// ΣΥΝΑΡΤΗΣΗ ΣΧΕΔΙΑΣΗΣ ΔΙΑΝΥΣΜΑΤΟΣ
// ===============================
function drawVector(x, y, dx, dy, label, col) {
  stroke(col);
  strokeWeight(2);
  line(x, y, x + dx, y + dy);

  push();
  translate(x + dx, y + dy);
  rotate(atan2(dy, dx));
  line(0, 0, -6, -6);
  line(0, 0, -6, 6);
  pop();

  noStroke();
  fill(col);
  text(label, x + dx + 5, y + dy / 2);
}