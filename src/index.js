const axios = require("axios");
const commandLineArgs = require("command-line-args");
const semver = require("semver");
const fs = require("fs-extra");
const path = require("path");
const {
    execSync,
} = require("child_process");
const {
    format,
} = require("date-fns");

(async () => {
    try {
        const options = commandLineArgs([{
            name: "id",
            type: Number,
        }, {
            name: "username",
            type: String,
        }, {
            name: "repo",
            type: String,
        }, {
            name: "name",
            type: String,
        }, {
            name: "email",
            type: String,
        }, {
            name: "increment",
            type: Boolean,
            defaultValue: true,
        }, {
            name: "branch",
            type: String,
            defaultValue: "master",
        }, {
            name: "filename",
            type: String,
            defaultValue: "CHANGELOG.md",
        }]);
        if (!options.id || !options.username || !options.repo || !options.name || !options.email) {
            console.error("Parameters required: id, username, repo, name, email");
            process.exit(1);
        }
        const packageJson = (await axios({
            method: "get",
            url: `https://raw.githubusercontent.com/${options.username}/${options.repo}/${options.branch}/package.json`,
        })).data;
        const nextVersion = options.increment ? semver.inc(packageJson.version, "patch") : packageJson.version;
        let changelogMD;
        try {
            changelogMD = (await axios({
                method: "get",
                url: `https://raw.githubusercontent.com/${options.username}/${options.repo}/${options.branch}/${options.filename}`,
            })).data;
        } catch {
            console.error(`Could not fetch ${options.filename} from ${options.branch}`);
            process.exit(1);
        }
        const pull = (await axios({
            method: "get",
            url: `https://api.github.com/repos/${options.username}/${options.repo}/pulls/${options.id}`,
        })).data;
        const {
            title,
            closed_at,
        } = pull;
        let output = `## v${nextVersion}\n\n**${title}** (${format(new Date(closed_at), "yyyy-MM-dd")})\n\n`;
        const commits = (await axios({
            method: "get",
            url: `https://api.github.com/repos/${options.username}/${options.repo}/pulls/${options.id}/commits`,
        })).data;
        if (commits.length) {
            output += "| Author | Date | Message |\n| -- | -- | -- |\n";
            for (const item of commits) {
                const author = `${item.commit.author.name}<br/>${item.commit.author.email}`;
                const message = item.commit.message.replace("\n", "<br/>");
                const date = new Date(item.commit.author.date);
                output += `| ${author} | ${format(date, "yyyy-MM-dd")} | ${message} |\n`;
            }
        }
        await fs.writeFile(path.resolve(__dirname, options.filename), `${output}\n\n${changelogMD}`, "utf8");
        execSync(`git config --global user.email "${options.email}"`, {
            stdio: "inherit"
        });
        execSync(`git config --global user.name "${options.name}"`, {
            stdio: "inherit"
        });
        execSync(`git add ${options.filename}`, {
            stdio: "inherit"
        });
        execSync(`git commit -m "docs: :memo: Updating changelog [${nextVersion}] [skip actions]"`, {
            stdio: "inherit"
        });
    } catch (e) {
        console.error(e.message);
    }
})();
