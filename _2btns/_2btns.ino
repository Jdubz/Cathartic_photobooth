int BUTTONPIN1 = 12;
unsigned long lastDebounceTime1 = 0;
int buttonState1;

int BUTTONPIN2 = 14;
unsigned long lastDebounceTime2 = 0;
int buttonState2;

unsigned long debounceDelay = 50;

void setup() {
  Serial.begin(9600);
}

void loop() {
  unsigned long now = millis();
  int btn1 = digitalRead(BUTTONPIN1);
  if (btn1 == 1 && buttonState1 != 1) {
    if ((now - lastDebounceTime1) > debounceDelay) {
      lastDebounceTime1 == now;
      buttonState = 1;
      Serial.println("1");
    } 
  } else if (digitalRead(BUTTONPIN1) == LOW && buttonState1 == 1) {
    buttonState1 = 0;
  }

  int btn2 = digitalRead(BUTTONPIN2);
  if btn2 == 1 && buttonState2 != 1) {
    if ((now - lastDebounceTime2) > debounceDelay) {
      lastDebounceTime2 == now;
      buttonState = 1;
      Serial.println("2");
    } 
  } else if (digitalRead(BUTTONPIN2) == LOW && buttonState2 == 1) {
    buttonState2 = 0;
  }
}
