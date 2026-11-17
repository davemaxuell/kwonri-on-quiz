import assert from 'node:assert/strict';
import test from 'node:test';
import { QUESTIONS } from '../src/data/questions.ts';
import {
  computeRank,
  evaluateAnswer,
  formatScore,
  formatStage,
} from '../src/lib/quizEngine.ts';

test('questions contain all 16 deduplicated O/X items with complete fields', () => {
  assert.equal(QUESTIONS.length, 16);
  assert.deepEqual(
    QUESTIONS.map((q) => q.answer),
    ['O', 'X', 'O', 'O', 'O', 'O', 'O', 'X', 'X', 'O', 'X', 'X', 'O', 'X', 'X', 'O']
  );
  const uniquePrompts = new Set(QUESTIONS.map((q) => q.question.trim()));
  assert.equal(uniquePrompts.size, QUESTIONS.length);
  for (const q of QUESTIONS) {
    assert.ok(q.question.trim().length > 0);
    assert.ok(q.lawRef.trim().length > 0);
    assert.ok(q.explanation.trim().length > 0);
  }
});

test('evaluateAnswer awards 200 base + 50 combo bonus on streak >= 2', () => {
  const first = evaluateAnswer(QUESTIONS[0], 'O', 0);
  assert.equal(first.record.isCorrect, true);
  assert.equal(first.record.pointsEarned, 200);
  assert.equal(first.nextStreak, 1);
  assert.equal(first.comboBonus, 0);

  const second = evaluateAnswer(QUESTIONS[1], 'X', first.nextStreak);
  assert.equal(second.record.isCorrect, true);
  assert.equal(second.record.pointsEarned, 250);
  assert.equal(second.nextStreak, 2);
  assert.equal(second.comboBonus, 50);

  const miss = evaluateAnswer(QUESTIONS[2], 'X', second.nextStreak);
  assert.equal(miss.record.isCorrect, false);
  assert.equal(miss.record.pointsEarned, 0);
  assert.equal(miss.nextStreak, 0);
});

test('computeRank scales proportionally for any question count', () => {
  assert.equal(computeRank(5, 5).grade, 'S');
  assert.equal(computeRank(4, 5).grade, 'A');
  assert.equal(computeRank(3, 5).grade, 'B');
  assert.equal(computeRank(1, 5).grade, 'C');
  assert.equal(computeRank(10, 10).grade, 'S');
});

test('HUD formatting pads stage and score cleanly', () => {
  assert.equal(formatScore(0), '00000');
  assert.equal(formatScore(200), '00200');
  assert.equal(formatStage(0, 5), '01/05');
  assert.equal(formatStage(4, 5), '05/05');
});
