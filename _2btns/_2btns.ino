int BUTTONPIN1 = 12;
int BUTTONPIN2 = 14;

void setup() {
  Serial.begin(9600);
}

void loop() {
  if (digitalRead(BUTTONPIN1) == HIGH) {
    Serial.println("1");
  }

  if (digitalRead(BUTTONPIN2) == HIGH) {
    Serial.println("2");
  }
}
