#!/bin/bash

# Practice Topic Generator
# Creates practice files from existing implementations in src/

echo "📚 Available Topics to Practice:"
echo ""
echo "POLYFILLS:"
echo "  1. arrayMap       - Implement Array.prototype.map"
echo "  2. arrayFilter    - Implement Array.prototype.filter"
echo "  3. arrayReduce    - Implement Array.prototype.reduce"
echo "  4. classNames     - Build a classNames utility"
echo "  5. flatten        - Flatten nested arrays"
echo "  6. promiseAll     - Implement Promise.all"
echo "  7. promiseAny     - Implement Promise.any"
echo ""
echo "CORE CONCEPTS:"
echo "  8. debounce       - Debounce function implementation"
echo "  9. throttle       - Throttle function implementation"
echo "  10. curry         - Function currying"
echo "  11. deepClone     - Deep clone objects"
echo "  12. generators    - Generator examples"
echo ""

if [ -z "$1" ]; then
  echo "Usage: ./practice-topic.sh <topic-name> [mode]"
  echo ""
  echo "Modes:"
  echo "  blank    - Start from scratch (only test file)"
  echo "  guided   - Copy tests + empty implementation (default)"
  echo "  study    - Copy both implementation + tests (for studying)"
  echo ""
  echo "Examples:"
  echo "  ./practice-topic.sh arrayMap              # Guided practice"
  echo "  ./practice-topic.sh arrayMap blank        # Start completely blank"
  echo "  ./practice-topic.sh arrayMap study        # Study existing code"
  exit 0
fi

TOPIC=$1
MODE=${2:-guided}
PRACTICE_DIR="practice"
TIMESTAMP=$(date +%Y%m%d_%H%M%S)

# Map topic names to source files
declare -A POLYFILLS=(
  ["arrayMap"]="src/polyfills/arrayMap.ts|src/__tests__/arrayPolyfills.test.ts"
  ["arrayFilter"]="src/polyfills/arrayFilter.ts|src/__tests__/arrayPolyfills.test.ts"
  ["arrayReduce"]="src/polyfills/arrayReduce.ts|src/__tests__/arrayPolyfills.test.ts"
  ["classNames"]="src/polyfills/classNames.ts|src/__tests__/classNames.test.ts"
  ["flatten"]="src/polyfills/flatten.ts|src/__tests__/flatten.test.ts"
  ["promiseAll"]="src/polyfills/promiseAll.ts|src/__tests__/promisePolyfills.test.ts"
  ["promiseAny"]="src/polyfills/promiseAny.ts|src/__tests__/promisePolyfills.test.ts"
)

declare -A CORE=(
  ["debounce"]="src/core/debounce.ts"
  ["throttle"]="src/core/throttle.ts"
  ["curry"]="src/core/curry.ts"
  ["deepClone"]="src/core/deepClone.ts"
  ["generators"]="src/core/generatorExamples.ts"
)

# Find the source file
SRC_FILE=""
TEST_FILE=""

if [[ -n "${POLYFILLS[$TOPIC]}" ]]; then
  IFS='|' read -r SRC_FILE TEST_FILE <<< "${POLYFILLS[$TOPIC]}"
elif [[ -n "${CORE[$TOPIC]}" ]]; then
  SRC_FILE="${CORE[$TOPIC]}"
else
  echo "❌ Unknown topic: $TOPIC"
  echo "Run './practice-topic.sh' to see available topics"
  exit 1
fi

# Create practice files based on mode
PRACTICE_FILE="$PRACTICE_DIR/${TOPIC}_${TIMESTAMP}.ts"
PRACTICE_TEST="$PRACTICE_DIR/${TOPIC}_${TIMESTAMP}.test.ts"

case $MODE in
  blank)
    # Completely blank - just basic structure
    cat > "$PRACTICE_FILE" << EOF
/**
 * Topic: $TOPIC
 * Mode: Blank (implement from scratch)
 * Date: $(date +%Y-%m-%d)
 * 
 * Reference implementation: $SRC_FILE
 */

// TODO: Implement your solution here
EOF
    
    cat > "$PRACTICE_TEST" << EOF
import { describe, it, expect } from 'vitest';
// import your implementation here

describe('$TOPIC - practice', () => {
  it('should work', () => {
    // TODO: Write your tests
    expect(true).toBe(true);
  });
});
EOF
    echo "✅ Created BLANK practice files (start from scratch):"
    ;;
    
  guided)
    # Copy tests, create empty implementation
    cat > "$PRACTICE_FILE" << EOF
/**
 * Topic: $TOPIC
 * Mode: Guided (tests provided, implement solution)
 * Date: $(date +%Y-%m-%d)
 * 
 * Reference implementation: $SRC_FILE
 * Run: npm run practice
 */

// TODO: Implement your solution to make the tests pass
// Hint: Check $SRC_FILE if you get stuck

EOF
    
    if [[ -f "$TEST_FILE" ]]; then
      # Extract relevant tests for this topic
      echo "import { describe, it, expect } from 'vitest';" > "$PRACTICE_TEST"
      echo "// import your functions from './${TOPIC}_${TIMESTAMP}';" >> "$PRACTICE_TEST"
      echo "" >> "$PRACTICE_TEST"
      echo "describe('$TOPIC - practice', () => {" >> "$PRACTICE_TEST"
      echo "  it('TODO: Copy tests from $TEST_FILE', () => {" >> "$PRACTICE_TEST"
      echo "    expect(true).toBe(true);" >> "$PRACTICE_TEST"
      echo "  });" >> "$PRACTICE_TEST"
      echo "});" >> "$PRACTICE_TEST"
      echo "// Reference: Check $TEST_FILE for test examples" >> "$PRACTICE_TEST"
    fi
    echo "✅ Created GUIDED practice files (tests as guide):"
    ;;
    
  study)
    # Copy both implementation and tests
    cp "$SRC_FILE" "$PRACTICE_FILE"
    if [[ -f "$TEST_FILE" ]]; then
      cp "$TEST_FILE" "$PRACTICE_TEST"
    fi
    echo "✅ Created STUDY files (full implementation + tests):"
    ;;
    
  *)
    echo "❌ Unknown mode: $MODE"
    echo "Use: blank, guided, or study"
    exit 1
    ;;
esac

echo "   - $PRACTICE_FILE"
echo "   - $PRACTICE_TEST"
echo ""
echo "📖 Reference implementation: $SRC_FILE"
if [[ -f "$TEST_FILE" ]]; then
  echo "📖 Reference tests: $TEST_FILE"
fi
echo ""
echo "Next steps:"
echo "  1. Run: npm run practice"
echo "  2. Open the practice files and start coding!"
echo "  3. Save to see tests run automatically"
echo ""
echo "💡 Tips:"
echo "  - Use the reference files if you get stuck"
echo "  - Try implementing without looking first"
echo "  - Compare your solution with the reference"
