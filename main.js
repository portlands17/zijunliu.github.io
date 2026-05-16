(function () {
  const content = window.siteContent;
  const languageKey = "neuro-homepage-language";
  const supportedLanguages = ["en", "zh"];
  const dictionary = {
    en: {
      languageToggle: "中文",
      "nav.research": "Research",
      "nav.projects": "Projects",
      "nav.cv": "CV",
      "nav.contact": "Contact",
      "hero.viewProjects": "View Projects",
      "hero.downloadCv": "Download CV",
      "hero.focusLabel": "Research Focus",
      "hero.methodsLabel": "Methods",
      "hero.seekingLabel": "Seeking",
      "sections.research.eyebrow": "Research Direction",
      "sections.research.title": "Questions I hope to pursue",
      "sections.projects.eyebrow": "Selected Work",
      "sections.projects.title": "Research projects",
      "sections.projects.question": "Research Question",
      "sections.projects.methods": "Methods",
      "sections.projects.contribution": "My Contribution",
      "sections.projects.outcome": "Outcome / What I Learned",
      "sections.projects.skills": "Relevant Skills",
      "sections.projects.link": "Project Link",
      "sections.cv.eyebrow": "Academic Background",
      "sections.cv.title": "CV snapshot",
      "sections.cv.download": "Download Full CV",
      "sections.education.title": "Education",
      "sections.publications.title": "Publications & Presentations",
      "sections.skills.title": "Methods & Skills",
      "sections.awards.title": "Awards & Service",
      "sections.contact.eyebrow": "Contact",
      "sections.contact.title": "Open to PhD conversations",
      "footer.note": "Last updated for PhD applications.",
    },
    zh: {
      languageToggle: "EN",
      "nav.research": "研究方向",
      "nav.projects": "项目经历",
      "nav.cv": "简历",
      "nav.contact": "联系",
      "hero.viewProjects": "查看项目",
      "hero.downloadCv": "下载简历",
      "hero.focusLabel": "研究关注",
      "hero.methodsLabel": "方法技能",
      "hero.seekingLabel": "申请方向",
      "sections.research.eyebrow": "研究方向",
      "sections.research.title": "我希望继续探索的问题",
      "sections.projects.eyebrow": "代表经历",
      "sections.projects.title": "研究项目",
      "sections.projects.question": "研究问题",
      "sections.projects.methods": "方法",
      "sections.projects.contribution": "我的贡献",
      "sections.projects.outcome": "结果 / 收获",
      "sections.projects.skills": "相关技能",
      "sections.projects.link": "项目链接",
      "sections.cv.eyebrow": "学术背景",
      "sections.cv.title": "简历摘要",
      "sections.cv.download": "下载完整简历",
      "sections.education.title": "教育经历",
      "sections.publications.title": "论文与展示",
      "sections.skills.title": "方法与技能",
      "sections.awards.title": "奖项与服务",
      "sections.contact.eyebrow": "联系",
      "sections.contact.title": "欢迎交流博士申请与研究匹配",
      "footer.note": "为博士申请主页更新。",
    },
  };

  function localized(value, language) {
    if (value && typeof value === "object") {
      return value[language] || value.en || "";
    }

    return value || "";
  }

  function currentLanguage() {
    const stored = window.localStorage.getItem(languageKey);
    return supportedLanguages.includes(stored) ? stored : content.defaultLanguage;
  }

  function setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }

  function renderTextContent(language) {
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.title =
      language === "zh"
        ? `${localized(content.profile.name, language)} | 神经科学博士申请主页`
        : `${localized(content.profile.name, language)} | Neuroscience PhD Portfolio`;

    document.querySelectorAll("[data-i18n]").forEach((element) => {
      const key = element.getAttribute("data-i18n");
      element.textContent = dictionary[language][key] || dictionary.en[key] || "";
    });

    const profileFields = [
      "name",
      "applicationTrack",
      "heroTitle",
      "summary",
      "researchFocus",
      "methodSummary",
      "seeking",
      "cvIntro",
      "contactNote",
    ];

    profileFields.forEach((field) => {
      setText(`[data-content="${field}"]`, localized(content.profile[field], language));
    });

    setText('[data-content="initials"]', content.profile.initials);
    setText('[data-content="footerName"]', localized(content.profile.name, language));

    document.querySelectorAll("[data-cv-link]").forEach((link) => {
      link.setAttribute("href", localized(content.cvUrl, language));
    });
  }

  function renderResearchInterests(language) {
    const container = document.querySelector('[data-render="researchInterests"]');
    container.innerHTML = "";

    content.researchInterests.forEach((item) => {
      const article = document.createElement("article");
      article.className = "interest-item";
      article.innerHTML = `
        <h3>${localized(item.title, language)}</h3>
        <p>${localized(item.description, language)}</p>
      `;
      container.append(article);
    });
  }

  function renderProjects(language) {
    const container = document.querySelector('[data-render="projects"]');
    container.innerHTML = "";

    content.projects.forEach((project, index) => {
      const article = document.createElement("article");
      article.className = "project-card";

      const projectLinks = normalizedProjectLinks(project);
      const maybeLinks = projectLinks.length
        ? `<div class="project-links">${projectLinks
            .map(
              (link) =>
                `<a class="text-link" href="${link.href}" ${externalAttributes(link.href)}>${localized(
                  link.label,
                  language,
                )}</a>`,
            )
            .join("")}</div>`
        : "";

      article.innerHTML = `
        <div class="project-index">${String(index + 1).padStart(2, "0")}</div>
        <div class="project-body">
          <div class="project-meta">
            <span>${localized(project.time, language)}</span>
            <span>${localized(project.institution, language)}</span>
          </div>
          <h3>${localized(project.title, language)}</h3>
          <div class="project-grid">
            ${projectField(language, "question", project.question)}
            ${projectField(language, "methods", project.methods)}
            ${projectField(language, "contribution", project.contribution)}
            ${projectField(language, "outcome", project.outcome)}
          </div>
          <div class="skill-row" aria-label="${dictionary[language]["sections.projects.skills"]}">
            ${project.skills.map((skill) => `<span>${skill}</span>`).join("")}
          </div>
          ${maybeLinks}
        </div>
      `;
      container.append(article);
    });
  }

  function normalizedProjectLinks(project) {
    if (Array.isArray(project.links)) {
      return project.links.filter((link) => link.href && link.href !== "#");
    }

    if (project.link && project.link !== "#") {
      return [
        {
          label: { en: dictionary.en["sections.projects.link"], zh: dictionary.zh["sections.projects.link"] },
          href: project.link,
        },
      ];
    }

    return [];
  }

  function externalAttributes(href) {
    return href.startsWith("http") ? 'target="_blank" rel="noreferrer"' : "";
  }

  function projectField(language, key, value) {
    return `
      <section class="project-field">
        <h4>${dictionary[language][`sections.projects.${key}`]}</h4>
        <p>${localized(value, language)}</p>
      </section>
    `;
  }

  function renderTimeline(language, key) {
    const container = document.querySelector(`[data-render="${key}"]`);
    container.innerHTML = "";

    content[key].forEach((item) => {
      const article = document.createElement("article");
      article.className = "timeline-item";
      article.innerHTML = `
        <h4>${localized(item.title, language)}</h4>
        <p class="timeline-meta">${localized(item.meta, language)}</p>
        ${item.description ? `<p>${localized(item.description, language)}</p>` : ""}
      `;
      container.append(article);
    });
  }

  function renderSkills() {
    const container = document.querySelector('[data-render="skills"]');
    container.innerHTML = content.skills.map((skill) => `<span>${skill}</span>`).join("");
  }

  function renderLinks(language) {
    const container = document.querySelector('[data-render="links"]');
    container.innerHTML = "";

    content.profile.links
      .filter((link) => link.href && link.href !== "#")
      .forEach((link) => {
      const anchor = document.createElement("a");
      anchor.href = link.href;
      anchor.textContent = localized(link.label, language);
      anchor.className = "contact-link";
      if (link.href.startsWith("http")) {
        anchor.target = "_blank";
        anchor.rel = "noreferrer";
      }
      container.append(anchor);
      });
  }

  function render(language) {
    renderTextContent(language);
    renderResearchInterests(language);
    renderProjects(language);
    renderTimeline(language, "education");
    renderTimeline(language, "publications");
    renderTimeline(language, "awards");
    renderSkills();
    renderLinks(language);
  }

  function toggleLanguage() {
    const nextLanguage = currentLanguage() === "en" ? "zh" : "en";
    window.localStorage.setItem(languageKey, nextLanguage);
    render(nextLanguage);
  }

  document.querySelector("[data-language-toggle]").addEventListener("click", toggleLanguage);
  render(currentLanguage());
})();
