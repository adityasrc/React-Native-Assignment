📝 React Native Assignment Notes: Aditya Prakash
Hi everyone at TAL,

To be honest, this was my first time ever building a mobile app. My background is mostly full-stack web development with React and Node, so moving from web logic to mobile in just 24 hours was a massive learning curve. It was a stressful but really cool challenge.

Here is a look at how I approached this, the walls I hit, and the calls I had to make to get a working build ready on time.

1. Moving from Web to Mobile
The Setup Pain: Just getting the Expo environment up and running and synced with my phone took way more time than I expected. npm and version management are way more of a pain on mobile compared to the web.

Performance and Lists: On a website, I’d just map an array into some divs and call it a day. For this app, I realized mobile memory is a different beast. I chose @shopify/flash-list over the standard FlatList because I wanted to make sure the scrolling felt smooth even if the list of questions got really long.

2. Getting out of "Tab Jail"
The Problem: This was the part where I got stuck the longest. I had a Bottom Sheet living inside the Home Tab, but when someone clicks 'Feedback', that result screen needs to cover everything, including the bottom tabs. At first, it wouldn't navigate because it was looking for that screen inside the Tab Navigator's limited world.

The Fix: I had to dig into how nested stacks work. I ended up using navigation.getParent() to break out of the tab context and trigger the main Root Stack. Figuring that out was a huge win for me.

3. Logic and State
Bottom Sheets: I went with a Bottom Sheet because it feels more like a real app experience than just pushing a new screen for a quick preview. I used simple local state to hold the question data when a card is tapped so the sheet fills up correctly before it slides up.

Keeping it Light: For the Session Result screen, I didn't use any heavy UI libraries for the 'Summary' vs 'Key Moments' tabs. I just used a basic string state to switch what shows up on the screen. It keeps the app fast and the code simple.

4. Honest Trade-offs
The 24-Hour Clock: The README mentioned 48 hours, but the email said 24. I decided to stick to the 24-hour limit to be safe.

What I Prioritized: Because of the time limit, the Login/Auth flow is just a shell that looks nice but doesn't have a backend yet. I also focused on getting the navigation and the overall "feel" of the Figma right instead of spending hours on complex animations. My main goal was a working, solid build that didn't crash.

Following the Theme: In the beginning, I tried to guess the margins and colors, but the UI looked messy. I realized I had to strictly follow your colors.ts and spacing.ts files. Once I treated those as the "law," the alignment issues mostly disappeared.

5. What I’d fix if I had more time
TypeScript: I’d clean up the navigation types. I had to use a few any shortcuts near the end just to make sure I hit the deadline.

Global State: Right now, I'm passing data around a bit too much. I’d move the question and progress data into something like Zustand to keep the components cleaner.

Refactoring: The HomeScreen file got pretty long and messy as I was rushing to finish. I’d definitely want to break the header, list items, and bottom sheet into their own separate files.

Thanks for the chance to work on this. It was a 24-hour crash course that taught me more about React Native than any tutorial could.