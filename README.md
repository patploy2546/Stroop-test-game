# Stroop Test Game — Cognitive Reflex Challenge

Stroop Test Game คือเกมฝึกสมาธิและการควบคุมความคิด ที่ออกแบบมาเพื่อทดสอบความเร็วในการตอบสนอง (Reaction Time) และ Cognitive Control ของผู้เล่น

ผู้เล่นต้อง “ตอบสีของข้อความ”
ไม่ใช่อ่านตัวคำ

ตัวอย่าง:

คำว่า RED อาจแสดงเป็น “สีน้ำเงิน”

ผู้เล่นต้องเลือก “BLUE”
ไม่ใช่อ่านคำว่า RED

เกมนี้ได้รับแรงบันดาลใจจาก Stroop Effect ในทางจิตวิทยา
ซึ่งใช้วัดความสามารถในการควบคุมสมาธิ และการตัดสินใจภายใต้แรงรบกวนของสมอง

---

## ฟีเจอร์ภายในเกม

* ระบบ Controlled Randomness เพื่อความแฟร์
* ระบบป้องกันคำและสีซ้ำติดกัน
* ระบบ Balanced Color Distribution
* ระบบจับ Average Reaction Time
* ระบบจับเวลาแบบ Real-time
* ระบบ Game Over ทันทีเมื่อกดผิด
* ระบบเลือกเวลาเล่น (10s / 20s / 30s)
* UI สไตล์ Minimal Cognitive Test

---

## วิธีเล่น

1. ดู “สี” ของข้อความบนหน้าจอ
2. กดปุ่มสีที่ถูกต้อง
3. ห้ามอ่านตามตัวคำ
4. หากกดผิด เกมจะจบทันที

ตัวอย่าง:

| Text | Display Color | Correct Answer |
| ---- | ------------- | -------------- |
| RED  | Blue          | BLUE           |

---

## ระบบ Fairness

เกมนี้ไม่ได้ใช้การสุ่มแบบ Pure Random

แต่ใช้ Controlled Randomness
เพื่อควบคุมความยากของโจทย์ให้ใกล้เคียงกันระหว่างผู้เล่น

ระบบจะ:

* ป้องกันคำซ้ำติดกัน
* ป้องกันสีซ้ำติดกัน
* ป้องกันคำและสีตรงกัน
* บาลานซ์จำนวนสีที่ออกในเกม

ดังนั้นคะแนนจะสะท้อน Skill มากกว่าดวง

---

## สถิติภายในเกม

หลังจบเกม ระบบจะแสดง:

* Score
* Average Reaction Time

---

## เทคโนโลยีที่ใช้

* TypeScript
* Vite
* HTML5
* CSS3

---

## วิธีติดตั้ง

Clone โปรเจกต์:

git clone https://github.com/your-username/stroop-test-game.git

ติดตั้ง dependencies:

npm install

เริ่มรันโปรเจกต์:

npm run dev

Build สำหรับ Production:

npm run build

---

## แนวคิดของเกม

เกมนี้ได้รับแรงบันดาลใจจาก Stroop Test
ที่ใช้ใน Cognitive Psychology

โดยเน้นวัด:

* Reaction Speed
* Cognitive Control
* Attention
* Decision Making
* Mental Interference Handling