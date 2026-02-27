// Prevent automatic scrolling restoration by the browser
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}

// Ensure the page starts at the very top
window.scrollTo(0, 0);

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Navigation & Mobile Menu ---
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(13, 17, 23, 0.95)';
            navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.5)';
            navbar.style.padding = '0.5rem 10%';
        } else {
            navbar.style.background = 'rgba(13, 17, 23, 0.8)';
            navbar.style.boxShadow = 'none';
            navbar.style.padding = '1rem 10%';
        }
    });

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
        });
    });


    // --- 2. Concept Cards Tilt Effect ---
    const tiltCards = document.querySelectorAll('.tilt-effect');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });


    // --- 3. Installation Tabs ---
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active to current
            btn.classList.add('active');
            const target = btn.getAttribute('data-target');
            document.getElementById(target).classList.add('active');
        });
    });


    // --- 4. Copy Code Button ---
    const copyBtns = document.querySelectorAll('.copy-btn');
    copyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const code = btn.previousElementSibling.innerText;
            navigator.clipboard.writeText(code).then(() => {
                const originalHtml = btn.innerHTML;
                btn.innerHTML = '<i class="fas fa-check"></i> Copied';
                btn.style.color = 'var(--success)';

                setTimeout(() => {
                    btn.innerHTML = originalHtml;
                    btn.style.color = '';
                }, 2000);
            });
        });
    });

    // --- 5. Interactive Commands Grid (Flip Cards) ---
    const commandsData = [
        { name: 'git init', desc: 'Initializes a brand new Git repository in the current folder.', syntax: 'git init', output: 'Initialized empty Git repository in .git/' },
        { name: 'git add', desc: 'Moves changes from the Working Directory to the Staging Area.', syntax: 'git add <file> OR git add .', output: '(No output means success)' },
        { name: 'git commit', desc: 'Saves your staged changes into the local repository with a message.', syntax: 'git commit -m "Your message"', output: '[main 1a2b3c] Your message\n 1 file changed, 1 insertion(+)' },
        { name: 'git status', desc: 'Shows the state of your working directory and staging area.', syntax: 'git status', output: 'On branch main\nChanges to be committed:\n  (use "git restore...)' },
        { name: 'git log', desc: 'Displays the commit history for the current branch.', syntax: 'git log', output: 'commit 1a2b3c4d...\nAuthor: You\nDate: Mon...' },
        { name: 'git push', desc: 'Uploads your local commits to a remote repository (like GitHub).', syntax: 'git push origin main', output: 'To github.com:user/repo.git\n * [new branch] main -> main' },
        { name: 'git pull', desc: 'Fetches changes from remote and merges them into your local branch.', syntax: 'git pull origin main', output: 'Updating 1a2b..3c4d\nFast-forward\n file.txt | 2 +-\n 1 file changed...' },
        { name: 'git clone', desc: 'Downloads a complete copy of a remote repository to your computer.', syntax: 'git clone <url>', output: 'Cloning into "repo"...\nReceiving objects: 100%' },
        { name: 'git branch', desc: 'Lists, creates, or deletes branches.', syntax: 'git branch <branch-name>', output: '* main\n  feature-branch' },
        { name: 'git merge', desc: 'Combines the specified branch history into the current branch.', syntax: 'git merge <branch-name>', output: 'Updating 1a2b..3c4d\nFast-forward' }
    ];

    const commandsContainer = document.getElementById('commands-container');

    commandsData.forEach(cmd => {
        const card = document.createElement('div');
        card.className = 'cmd-card';
        card.innerHTML = `
            <div class="cmd-card-inner">
                <div class="cmd-front">
                    <code>${cmd.name}</code>
                    <p>Tap to reveal</p>
                </div>
                <div class="cmd-back">
                    <h4>${cmd.name}</h4>
                    <p>${cmd.desc}</p>
                    <div class="code-block">
                        <div style="color:var(--text-secondary); margin-bottom: 4px;">Syntax:</div>
                        ${cmd.syntax}
                        <div style="color:var(--text-secondary); margin: 8px 0 4px;">Output:</div>
                        <span style="color:var(--success)">${cmd.output}</span>
                    </div>
                </div>
            </div>
        `;
        commandsContainer.appendChild(card);
    });

    // Make touch devices work better with flip cards
    const cmdCards = document.querySelectorAll('.cmd-card');
    cmdCards.forEach(card => {
        card.addEventListener('click', () => {
            card.classList.toggle('flipped');
        });
    });


    // --- 6. Terminal Simulator ---
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');
    const simFeedback = document.getElementById('sim-feedback');
    const simTasks = document.querySelectorAll('#sim-task-list li');

    let currentTaskIndex = 0;

    // Virtual Git State
    const gitState = {
        initialized: false,
        files: ['index.html', 'style.css'],
        staged: [],
        commits: []
    };

    function appendOutput(content, type = 'output') {
        const div = document.createElement('div');
        div.className = `terminal-line ${type}`;
        if (type === 'cmd') {
            div.innerHTML = `<span class="prompt">$</span>${content}`;
        } else {
            div.textContent = content;
        }
        terminalOutput.appendChild(div);
        terminalOutput.scrollTop = terminalOutput.scrollHeight;
    }

    function showFeedback(msg, isError = false) {
        simFeedback.textContent = msg;
        simFeedback.style.display = 'block';
        if (isError) {
            simFeedback.classList.add('error');
        } else {
            simFeedback.classList.remove('error');
        }

        setTimeout(() => {
            // Keep error visible a bit longer
            if (!isError) simFeedback.style.display = 'none';
        }, 3000);
    }

    function advanceTask() {
        if (currentTaskIndex < simTasks.length) {
            simTasks[currentTaskIndex].classList.remove('active-task');
            simTasks[currentTaskIndex].classList.add('completed-task');

            currentTaskIndex++;

            if (currentTaskIndex < simTasks.length) {
                simTasks[currentTaskIndex].classList.add('active-task');
            } else {
                showFeedback("🎉 Great job! You completed all simulator tasks!", false);
                appendOutput("🎉 All tasks completed! You are ready for the real thing.", "success-msg");
            }
        }
    }

    function processCommand(cmd) {
        const fullCmd = cmd.trim();
        const args = fullCmd.split(' ').filter(Boolean);

        appendOutput(fullCmd, 'cmd');
        terminalInput.value = '';

        if (args.length === 0) return;

        const baseCmd = args[0] + (args[1] ? ' ' + args[1] : '');

        if (fullCmd === 'clear') {
            terminalOutput.innerHTML = '';
            return;
        }

        if (fullCmd === 'help') {
            appendOutput("Available commands: git init, git status, git add ., git commit -m <msg>, clear, help");
            return;
        }

        if (args[0] !== 'git') {
            appendOutput(`bash: ${args[0]}: command not found`, 'error-msg');
            return;
        }

        // Git Commands Logic
        switch (baseCmd) {
            case 'git init':
                if (gitState.initialized) {
                    appendOutput("Reinitialized existing Git repository in /home/user/project/.git/");
                } else {
                    gitState.initialized = true;
                    appendOutput("Initialized empty Git repository in /home/user/project/.git/", "success-msg");
                    if (currentTaskIndex === 0) {
                        showFeedback("Awesome! Repository initialized.");
                        advanceTask();
                        animateWorkflowStage('working'); // visualize
                    }
                }
                break;

            case 'git status':
                if (!gitState.initialized) {
                    appendOutput("fatal: not a git repository (or any of the parent directories): .git", "error-msg");
                    return;
                }

                if (gitState.staged.length === 0 && gitState.commits.length === 0) {
                    appendOutput("On branch main\n\nNo commits yet\n\nUntracked files:\n  (use \"git add <file>...\" to include in what will be committed)\n\t\x1b[31mindex.html\x1b[0m\n\t\x1b[31mstyle.css\x1b[0m\n\nnothing added to commit but untracked files present");

                    if (currentTaskIndex === 2) {
                        advanceTask();
                    }
                } else if (gitState.staged.length > 0 && gitState.commits.length === 0) {
                    appendOutput("On branch main\n\nNo commits yet\n\nChanges to be committed:\n  (use \"git rm --cached <file>...\" to unstage)\n\t\x1b[32mnew file:   index.html\x1b[0m\n\t\x1b[32mnew file:   style.css\x1b[0m");

                    if (currentTaskIndex === 2) {
                        showFeedback("Status looks good. Ready to commit.");
                        advanceTask();
                    }
                } else {
                    appendOutput("On branch main\nnothing to commit, working tree clean");
                }
                break;

            case 'git add':
                if (!gitState.initialized) {
                    appendOutput("fatal: not a git repository (or any of the parent directories): .git", "error-msg");
                    return;
                }

                if (args[2] === '.' || args[2] === '-A') {
                    gitState.staged = [...gitState.files];
                    if (currentTaskIndex === 1) {
                        showFeedback("Files added to staging area!");
                        advanceTask();
                        animateWorkflowStage('staging');
                        document.querySelector('.arrow-add').classList.add('pulse');
                        setTimeout(() => document.querySelector('.arrow-add').classList.remove('pulse'), 1000);
                    }
                } else {
                    appendOutput("fatal: pathspec did not match any files", "error-msg");
                }
                break;

            case 'git commit':
                if (!gitState.initialized) {
                    appendOutput("fatal: not a git repository (or any of the parent directories): .git", "error-msg");
                    return;
                }

                if (gitState.staged.length === 0) {
                    appendOutput("On branch main\nnothing to commit, working tree clean");
                    return;
                }

                if (args[2] === '-m' && args[3]) {
                    const msg = args.slice(3).join(' ').replace(/["']/g, '');
                    const hash = Math.random().toString(16).substring(2, 9);
                    gitState.commits.push({ hash, msg });
                    gitState.staged = []; // Reset staged

                    appendOutput(`[main (root-commit) ${hash}] ${msg}\n 2 files changed, 100 insertions(+)`, "success-msg");

                    if (currentTaskIndex === 3) {
                        showFeedback("Perfect! Changes committed to history.");
                        advanceTask();
                        animateWorkflowStage('local');
                        document.querySelector('.arrow-commit').classList.add('pulse');
                        setTimeout(() => document.querySelector('.arrow-commit').classList.remove('pulse'), 1000);
                    }
                } else {
                    appendOutput("error: need to format: git commit -m \"message\"", "error-msg");
                }
                break;

            default:
                appendOutput(`git: '${args[1]}' is not a git command. See 'git --help'.`, 'error-msg');
        }
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const val = terminalInput.value;
            if (val) processCommand(val);
        }
    });

    // Bring terminal into focus when clicking anywhere on wrapper
    document.querySelector('.terminal-window').addEventListener('click', () => {
        terminalInput.focus();
    });


    // --- 7. Errors Accordion ---
    const accordions = document.querySelectorAll('.accordion-item');

    accordions.forEach(item => {
        const header = item.querySelector('.accordion-header');
        header.addEventListener('click', () => {
            // Close others
            accordions.forEach(a => {
                if (a !== item) {
                    a.classList.remove('active');
                    a.querySelector('.accordion-content').style.maxHeight = null;
                }
            });

            // Toggle current
            item.classList.toggle('active');
            const content = item.querySelector('.accordion-content');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });


    // --- 8. Global Workflow Animation Helper (for buttons directly inside HTML) ---
    window.animateWorkflow = function (action) {
        // Reset pulses
        document.querySelectorAll('.flow-arrow').forEach(a => a.classList.remove('pulse'));

        let arrowSelector, targetStage;

        switch (action) {
            case 'add':
                arrowSelector = '.arrow-add';
                targetStage = 'staging';
                break;
            case 'commit':
                arrowSelector = '.arrow-commit';
                targetStage = 'local';
                break;
            case 'push':
                arrowSelector = '.arrow-push';
                targetStage = 'remote';
                break;
        }

        if (arrowSelector) {
            document.querySelector(arrowSelector).classList.add('pulse');
            setTimeout(() => document.querySelector(arrowSelector).classList.remove('pulse'), 1500);
            animateWorkflowStage(targetStage);
        }
    };

    function animateWorkflowStage(stageId) {
        document.querySelectorAll('.flow-stage').forEach(s => s.classList.remove('active'));
        const target = document.getElementById(`stage-${stageId}`);
        if (target) target.classList.add('active');
    }

    // --- 9. Glitch Effect on Title ---
    // The CSS handles the main glitch, JS can add random stutters if needed,
    // but pure CSS is usually smoother. We are using CSS glitch via ::before/::after usually, 
    // but if not implemented in CSS, let's keep it static beautiful text.
});
