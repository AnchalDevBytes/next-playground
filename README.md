# SDE 1 Frontend Machine Coding Practice Questions

Machine coding rounds evaluate your ability to write clean, modular, scalable, and bug-free code within a limited timeframe (typically 60 to 90 minutes). For SDE 1 Frontend roles at top-tier product companies (Swiggy, Flipkart, Slice, Fractal, Thinkify Labs), the focus shifts between core JavaScript fundamentals (closures, event delegation, asynchronous programming) and robust React architecture (state design, custom hooks, performance optimization).

This repository contains 20 of the most frequently asked machine coding questions in the industry, complete with problem statements, mock data, and architectural approaches.

---

## Part 1: Pure JavaScript & DOM Manipulation (No Frameworks)
*These questions test your core understanding of the DOM, Event Loop, Closures, and JS memory management.*

### 1. The Event Emitter (Pub/Sub Pattern)
* **Problem Statement:** Build a custom `EventEmitter` class in pure JavaScript that allows subscribing to events, emitting events with arguments, and unsubscribing.
* **Core Requirements:** Implement `on(eventName, callback)`, `emit(eventName, ...args)`, `off(eventName, callback)`, and `once(eventName, callback)`.
* **Approach Hint:** Use a JavaScript `Map` or plain object to store event names as keys and arrays of callbacks as values. Pay attention to how `this` behaves in callbacks.

### 2. Nested Comment DOM Renderer
* **Problem Statement:** Given a deeply nested JSON object of comments, render them into the DOM using pure JavaScript.
* **Mock Data:** `[{ id: 1, text: "Hello", children: [{ id: 2, text: "Hi there!", children: [] }] }]`
* **Approach Hint:** Use a recursive function combined with `document.createElement`. To optimize DOM insertion, use `DocumentFragment` to batch appends before attaching them to the live DOM tree to avoid excessive reflows.

### 3. Vanilla Tic-Tac-Toe
* **Problem Statement:** Build a 3x3 Tic-Tac-Toe game using HTML, CSS, and Vanilla JS.
* **Core Requirements:** Track whose turn it is, detect win/draw conditions, and implement a reset button.
* **Approach Hint:** **First Principles:** Put an `onClick` on all 9 cells. **Optimized (Interview):** Use **Event Delegation**. Put a single `onClick` on the parent grid container and use `event.target` to determine which cell was clicked. Use a 1D array (`Array(9).fill(null)`) for state instead of a complex 2D array.

### 4. Debounced Typeahead / Autocomplete
* **Problem Statement:** Build an input box that fetches suggestions from a mock API based on user input, using pure JS.
* **Core Requirements:** Implement your own `debounce` function. Handle race conditions (if typing 'a' takes 3 seconds to resolve, but typing 'ab' takes 1 second, ensure 'a' doesn't overwrite 'ab').
* **Approach Hint:** Use `AbortController` to cancel pending `fetch` requests when a new keystroke occurs.

### 5. Throttle & Debounce implementations
* **Problem Statement:** Write polyfills for `lodash.debounce` and `lodash.throttle` and attach them to a window resize event and a scrolling container.
* **Approach Hint:** * *Debounce:* Uses `clearTimeout` on every call, and sets a new `setTimeout`.
  * *Throttle:* Uses a boolean flag `isThrottled` or tracks `lastExecutedTime` to ensure the function fires at most once every $X$ milliseconds.

---

## Part 2: React & Frontend Architecture

### 6. Infinite Scroll with Debounced Search
* **Target Companies:** Swiggy, Flipkart
* **Problem Statement:** Build a product listings page that fetches data from a mock API as the user scrolls down, combined with a search bar.
* **Mock API:** `GET /api/products?query={term}&page={page}` returning `{ data: [...], nextPage: 2 }`
* **Approach Hint:** * **First Principles:** `window.addEventListener('scroll')` calculating scroll heights.
  * **Optimized:** Ditch scroll events. Place a dummy `<div id="observer-target">` at the bottom of the list and use the `IntersectionObserver` API to trigger the next fetch, completely eliminating main-thread scroll jank.

### 7. Configurable Form Builder / Dynamic Form
* **Target Companies:** Fractal, Thinkify Labs
* **Problem Statement:** Design a component that takes a JSON schema definition as a prop and dynamically renders a fully functional form with validations.
* **Mock Schema:** `[{ id: "username", type: "text", required: true }, { id: "country", type: "select", options: ["IN", "US"] }]`
* **Approach Hint:** Create a component map (`const ComponentMap = { text: TextInput, select: SelectInput };`). Render dynamically via `<ComponentMap[field.type] />`. Keep local state controlled on `onBlur` to prevent full form re-renders on every keystroke.

### 8. Custom Nested Comments Component
* **Target Companies:** Flipkart, Swiggy
* **Problem Statement:** Create an interactive, multi-threaded comment section similar to Reddit.
* **Approach Hint:** * **First Principles:** Recursive components cloning a massive nested tree state.
  * **Optimized:** Normalize the state. Store comments in a dictionary/hash map where the key is the `id` (`{ 1: { text: "...", childIds: [2] } }`). Updating a nested reply becomes an $O(1)$ operation without deep tree traversals.

### 9. Multi-Select Auto-Suggest Tag Input
* **Target Companies:** Flipkart, Thinkify Labs
* **Problem Statement:** Build a search input box that displays suggestions. Selecting an item turns it into a dismissible "chip/tag".
* **Approach Hint:** Implement a cache map for previous queries. **Accessibility is key:** manage a `focusedIndex` state so users can navigate the dropdown with `ArrowUp` and `ArrowDown`, select with `Enter`, and delete the last tag with `Backspace`.

### 10. Custom Toast Notification System
* **Target Companies:** Slice, Swiggy
* **Problem Statement:** Implement a global notification provider that can trigger transient alert messages from anywhere in the app.
* **Approach Hint:** Use `ReactDOM.createPortal` to mount the toast container directly to `document.body` to avoid CSS `z-index` and `overflow: hidden` issues. Ensure you `clearTimeout` if a user manually dismisses a toast early to prevent memory leaks.

### 11. File Explorer / Directory Tree Structure
* **Target Companies:** Thinkify Labs, Fractal
* **Problem Statement:** Create a VS Code-like file architecture explorer that renders folders and files.
* **Mock Schema:** `{ id: "root", isFolder: true, items: [{ id: "f1", name: "index.js", isFolder: false }] }`
* **Approach Hint:** The expanded/collapsed state of a folder is *visual UI state*, not business logic state. Keep the `isOpen` state locally inside the recursive `<Folder />` component rather than polluting the global file tree JSON.

### 12. Paginated Data Table with Sorting and Filtering
* **Target Companies:** Fractal, Thinkify Labs
* **Problem Statement:** Build a high-performance data grid component to display a large dataset (e.g., 5,000 rows).
* **Approach Hint:** Never run `.sort()` or `.filter()` directly on the main state array inside the render cycle. Use `useMemo` to create a `derivedState` that computes the sorted/paginated data only when the `sortConfig` or `currentPage` changes.

### 13. Interactive Star Rating Component
* **Target Companies:** Slice, Fractal
* **Problem Statement:** Design a highly reusable widget to collect product ratings out of $N$ stars.
* **Approach Hint:** Do not hardcode 5 stars; use `Array.from({ length: maxStars })`. To support fractional ratings (e.g., 3.5 stars), wrap the SVG in a `div` with `overflow: hidden` and dynamically set the width to a percentage based on the hover/click state.

### 14. Transfer List Component (Dual List Box)
* **Target Companies:** Fractal, Flipkart
* **Problem Statement:** Create an interface featuring two side-by-side list boxes where items can be selected and moved back and forth.
* **Approach Hint:** Avoid using two separate arrays (`leftList` and `rightList`), which can lead to desync bugs. Keep a single source of truth: one array of objects `{ id: 1, side: 'left' }`. Moving an item is just updating its `side` property.

### 15. Kanban Board with Drag and Drop
* **Target Companies:** Thinkify Labs, Flipkart
* **Problem Statement:** Build a task management dashboard with columns (To Do, In Progress, Done).
* **Approach Hint:** Use the native HTML5 Drag and Drop API (`draggable={true}`). On `onDragStart`, store the `taskId` in `e.dataTransfer.setData`. On the target column's `onDrop`, read the ID and update the parent state. Remember to call `e.preventDefault()` on `onDragOver` or the drop event won't fire.

### 16. Countdown Timer / Stopwatch with Laps
* **Target Companies:** Slice
* **Problem Statement:** Build a precision timer application.
* **Approach Hint:** Using `setInterval` to increment a counter by 10ms leads to time drift due to JS being single-threaded. Instead, record `Date.now()` at start, and calculate the delta inside the interval for accurate timekeeping.

### 17. Virtual Lightbox / Carousel with Lazy Loading
* **Target Companies:** Swiggy, Flipkart
* **Problem Statement:** Create a responsive image gallery slider that handles media elements efficiently.
* **Approach Hint:** Render only the current image, the previous, and the next image in the DOM (windowing). Use the `loading="lazy"` attribute on `<img>` tags, or `IntersectionObserver` to fetch heavy assets only when they enter the view buffer.

### 18. Custom Accordion / Tabs Component
* **Target Companies:** Slice, Fractal
* **Problem Statement:** Design a modular UI pattern to toggle information visibility.
* **Approach Hint:** Support both single-open (like an accordion) and multi-open modes. Use the Compound Component Pattern (e.g., `<Accordion>`, `<Accordion.Item>`, `<Accordion.Header>`) leveraging React Context to pass state silently between parent and children.

### 19. Shopping Cart Matrix with Real-time Discounts
* **Target Companies:** Flipkart, Swiggy
* **Problem Statement:** Build an e-commerce checkout interface managing items, quantities, and coupon applications.
* **Approach Hint:** Maintain a single state object for the cart `Map<ProductId, Quantity>`. Calculate the subtotal, taxes, and final discount purely as derived variables inside the render cycle (or `useMemo`), rather than syncing them to separate `useState` variables.

### 20. Analytics Dashboard with Custom Grid Layouts
* **Target Companies:** Fractal, Thinkify Labs
* **Problem Statement:** Design a monitoring panel housing multiple data cards and visual widgets.
* **Approach Hint:** Focus on layout flexibility using CSS Grid. Use the HOC (Higher Order Component) pattern or render props to wrap standard widgets in "Card" containers that handle their own loading and error boundaries independently from the rest of the dashboard.

---

### Crucial Interview Checkpoints 🚀
When building these components during an interview, your evaluator will explicitly look for:
1. **Separation of Concerns:** Keep your business logic (fetching, formatting) separate from UI components. Use custom hooks (e.g., `useFetch`, `usePagination`).
2. **Edge Case Handling:** Handle empty arrays, loading states, network failures, and extremely long text strings that break CSS layouts.
3. **Accessibility (a11y):** Add `aria-labels`, `tabIndex`, and ensure keyboard navigation works for custom inputs.
4. **Optimization:** Stop unnecessary re-renders. Use `React.memo` for heavy child components, and `useCallback` when passing functions down as props.
