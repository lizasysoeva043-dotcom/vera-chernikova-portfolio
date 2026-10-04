import { useEffect, useRef, useState } from "react";
import portrait from "./assets/portrait.jpg";
import portraitMask from "./assets/portrait-mask.png";
import funnel from "./assets/funnel.jpg";
import funnelMask from "./assets/funnel-mask.png";
import booth from "./assets/booth.jpg";
import boothMask from "./assets/booth-mask.png";
import laptop from "./assets/laptop.jpg";
import laptopMask from "./assets/laptop-mask.png";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
};

const navigation = [
  { id: "value", label: "Ценность" },
  { id: "skills", label: "Компетенции" },
  { id: "experience", label: "Путь" },
  { id: "cases", label: "Кейсы" },
  { id: "contact", label: "Контакты" },
];

const values = [
  {
    title: "Нет прозрачности по бюджету",
    items: [
      "Настраиваю финансовую отчетность по рекламе в Excel",
      "Сводные, разрезы по каналам, целям, периодам",
      "Ритм отчетности: еженедельно, ежемесячно",
    ],
    result: "аргументированная защита бюджета и понятные выводы «что работает»",
  },
  {
    title: "Мало лидов, нет системы",
    items: [
      "Сбор и сегментация баз (B2B), гипотезы по каналам",
      "Настройка форм и фиксации лидов без потерь",
      "Контент и офферы под сегменты ЦА",
    ],
    result: "стабильный поток целевых обращений и меньше «свалившихся» лидов",
  },
  {
    title: "Хаос с подрядчиками",
    items: [
      "Ставлю ТЗ дизайнерам и разработчикам",
      "Контроль сроков, приемка, единые стандарты",
      "Закрываю коммуникацию с подрядчиками",
    ],
    result: "предсказуемое выполнение задач без вашей микроменеджерской нагрузки",
  },
  {
    title: "Хаос с подрядчиками",
    items: [
      "Ставлю ТЗ дизайнерам и разработчикам",
      "Контроль сроков, приемка, единые стандарты",
      "Закрываю коммуникацию с подрядчиками",
    ],
    result: "предсказуемое выполнение задач без вашей микроменеджерской нагрузки",
  },
  {
    title: "Мало лидов, нет системы",
    items: [
      "Сбор и сегментация баз (B2B), гипотезы по каналам",
      "Настройка форм и фиксации лидов без потерь",
      "Контент и офферы под сегменты ЦА",
    ],
    result: "стабильный поток целевых обращений и меньше «свалившихся» лидов",
  },
  {
    title: "Хаос с подрядчиками",
    items: [
      "Ставлю ТЗ дизайнерам и разработчикам",
      "Контроль сроков, приемка, единые стандарты",
      "Закрываю коммуникацию с подрядчиками",
    ],
    result: "предсказуемое выполнение задач без вашей микроменеджерской нагрузки",
  },
];

const competencies = [
  {
    number: "01",
    title: "Event 360° / Выставки",
    items: ["Планирование, бюджетирование", "Управление подрядчиками", "Пост-анализ эффективности", "Сбор контактов на стенде"],
  },
  {
    number: "02",
    title: "Digital и автоматизация",
    items: ["Telegram-боты (схемы пути пользователя)", "Интеграции: Tilda + amoCRM", "Омниканал: соцсети + email + инфлюенс"],
  },
  {
    number: "03",
    title: "Web и SEO (управление)",
    items: ["WordPress / Tilda", "ТЗ разработчикам / дизайнерам", "Контент и новости", "Базовая верстка"],
  },
  {
    number: "04",
    title: "CRM, Email, лояльность",
    items: ["Email-рассылки: верстка, редактура", "Программы лояльности (механика)", "Retention", "CustDev"],
  },
  {
    number: "05",
    title: "Аналитика и управление",
    items: ["Фин. отчетность (Excel)", "Сегментация баз, лидогенерация", "Контроль сроков и качества подрядчиков"],
  },
];

const experience = [
  {
    period: "2024–2026",
    role: "Менеджер по рекламе и маркетингу",
    field: "B2B электростанции",
    text: "4 профильные выставки, полный цикл. Схема пути клиента (TG-бот), интеграция Tilda + amoCRM, SEO-управление, email, фин. отчетность.",
  },
  {
    period: "2023–2024",
    role: "Бренд-менеджер",
    field: "Лодочные моторы",
    text: "Бренд-стратегия, медиаплан (CJM, CustDev). Выставка 5 млн ₽ за 2 месяца, редизайн сайта на WordPress, омниканал + инфлюенс.",
  },
  {
    period: "2022–2023",
    role: "SMM-специалист",
    field: "Недвижимость / строительство",
    text: "SMM-стратегии (TG / VK / IG). Кросс-маркетинг, PR / offline поддержка.",
  },
  {
    period: "2021–2022",
    role: "Координатор по маркетингу",
    field: "Отель / HoReCa",
    text: "Воронки и стратегии (конкурентный анализ, Mystery Shopper). Запуск ресторана с нуля, лендинг на Tilda, retention и CustDev.",
  },
  {
    period: "2021",
    role: "Маркетолог",
    field: "Ритейл",
    text: "Соцсети и контроль performance-подрядчиков. Контент (Canva), полиграфия, участие в выставках.",
  },
  {
    period: "2020",
    role: "Новостной редактор",
    field: "Медиа",
    text: "Фактчекинг, тексты и дедлайны.",
  },
];

function Reveal({ children, className = "", delay = 0 }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function MaskedImage({
  src,
  mask,
  alt,
  className = "",
}: {
  src: string;
  mask: string;
  alt: string;
  className?: string;
}) {
  return (
    <img
      className={className}
      src={src}
      alt={alt}
      style={{
        maskImage: `url(${mask})`,
        WebkitMaskImage: `url(${mask})`,
        maskMode: "luminance",
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
      }}
    />
  );
}

function Header({
  active,
  menuOpen,
  setMenuOpen,
}: {
  active: string;
  menuOpen: boolean;
  setMenuOpen: (value: boolean) => void;
}) {
  return (
    <header className="site-header">
      <a className="brand" href="#top" aria-label="Вера Черникова — наверх">
        ВЧ
      </a>
      <nav className={menuOpen ? "nav is-open" : "nav"} aria-label="Основная навигация">
        {navigation.map((item) => (
          <a
            key={item.id}
            href={`#${item.id}`}
            className={active === item.id ? "active" : ""}
            onClick={() => setMenuOpen(false)}
          >
            {item.label}
          </a>
        ))}
      </nav>
      <a className="header-cta" href="#contact">
        Обсудить задачи
      </a>
      <button
        className={menuOpen ? "menu-button is-open" : "menu-button"}
        type="button"
        aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span />
        <span />
      </button>
    </header>
  );
}

function ValueCard({ item, index }: { item: (typeof values)[number]; index: number }) {
  return (
    <Reveal className="value-card" delay={(index % 3) * 90}>
      <span className="card-number">({String(index + 1).padStart(2, "0")})</span>
      <h3>{item.title}</h3>
      <ul>
        {item.items.map((point) => (
          <li key={point}>{point}</li>
        ))}
      </ul>
      <div className="result">
        <span>Что получите:</span>
        <p>{item.result}</p>
      </div>
    </Reveal>
  );
}

function App() {
  const [active, setActive] = useState("value");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const sections = navigation
      .map((item) => document.getElementById(item.id))
      .filter((item): item is HTMLElement => Boolean(item));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-20% 0px -60% 0px", threshold: [0, 0.2, 0.5] },
    );
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="page-shell" id="top">
      <Header active={active} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

      <main>
        <section className="hero">
          <div className="hero-glow" />
          <div className="hero-copy">
            <div className="hero-tags load-in">
              <span>Маркетинг</span>
              <span>Middle+</span>
            </div>
            <h1 className="load-in delay-1">
              Вера
              <br />
              Черникова
            </h1>
            <p className="hero-lead load-in delay-2">
              Автономно закрываю задачи маркетинга: event 360°, автоматизация воронки, аналитика и репутация.
            </p>
            <a className="primary-button load-in delay-3" href="#contact">
              Обсудить сотрудничество
              <span aria-hidden="true">↘</span>
            </a>
          </div>
          <div className="hero-portrait load-in delay-2">
            <MaskedImage src={portrait} mask={portraitMask} alt="Вера Черникова" />
          </div>
          <div className="hero-disciplines load-in delay-3" aria-label="Направления работы">
            <span>Автоматизация</span>
            <span>Аналитика</span>
            <span>Event 360°</span>
          </div>
          <a className="scroll-hint" href="#value" aria-label="Перейти к разделу Ценность">
            Scroll
            <span>↓</span>
          </a>
        </section>

        <section className="value-section section" id="value">
          <div className="section-art funnel-art" aria-hidden="true">
            <MaskedImage src={funnel} mask={funnelMask} alt="" />
          </div>
          <Reveal>
            <p className="eyebrow">Подход к работе</p>
            <h2>Ценность для руководителя</h2>
            <p className="section-intro">
              Закрываю операционку и даю прозрачный результат, чтобы вы занимались стратегией.
            </p>
          </Reveal>
          <div className="value-grid">
            {values.map((item, index) => (
              <ValueCard item={item} index={index} key={`${item.title}-${index}`} />
            ))}
          </div>
          <Reveal className="wide-cta" delay={120}>
            <p>
              Готова обсудить задачи вашего отдела и предложить план точек роста с прогнозируемым результатом.
            </p>
            <a href="#contact">
              Связаться
              <span>↗</span>
            </a>
          </Reveal>
        </section>

        <section className="skills-section section" id="skills">
          <Reveal>
            <p className="eyebrow">Маркетинг + автоматизация</p>
            <h2>Компетенции</h2>
          </Reveal>
          <div className="skills-layout">
            <div className="competency-grid">
              {competencies.map((item, index) => (
                <Reveal className="competency-card" delay={(index % 2) * 90} key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <div className="pill-list">
                    {item.items.map((skill) => (
                      <span key={skill}>{skill}</span>
                    ))}
                  </div>
                </Reveal>
              ))}
            </div>
            <Reveal className="tools-card" delay={120}>
              <p className="tools-label">Инструменты</p>
              <div className="tools-grid">
                {["amoCRM", "WordPress", "Tilda", "Figma", "MS Excel", "Telegram (боты)", "Canva"].map(
                  (tool, index) => (
                    <span key={tool}>
                      <b>{String(index + 1).padStart(2, "0")}</b>
                      {tool}
                    </span>
                  ),
                )}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="experience-section section" id="experience">
          <Reveal className="experience-heading">
            <div>
              <p className="eyebrow">5+ лет опыта</p>
              <h2>Профессиональный путь</h2>
            </div>
            <p>От редакторской точности к системному управлению маркетингом.</p>
          </Reveal>
          <div className="timeline">
            {experience.map((item, index) => (
              <Reveal className="timeline-item" delay={(index % 2) * 80} key={item.period}>
                <span className="timeline-dot" />
                <div className="period">{item.period}</div>
                <div className="timeline-card">
                  <span>{item.field}</span>
                  <h3>{item.role}</h3>
                  <p>{item.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="cases-section section" id="cases">
          <div className="booth-art" aria-hidden="true">
            <MaskedImage src={booth} mask={boothMask} alt="" />
          </div>
          <Reveal>
            <p className="eyebrow">Измеримые показатели и решения</p>
            <h2>Кейсы и результаты</h2>
          </Reveal>
          <div className="cases-grid">
            <Reveal className="case-card case-main">
              <span className="case-index">Кейс 01</span>
              <h3>B2B выставка (полный цикл)</h3>
              <p>
                <b>Контекст:</b> профильная выставка, работа на стенде и помощь продажам.
              </p>
              <p>
                <b>Что делала:</b> площадка с высокой проходимостью, подрядчики по застройке, сувенирка, промоутеры,
                механики сбора контактов, интеграции для фиксации лидов.
              </p>
              <div className="metrics">
                <div>
                  <strong>&gt;500</strong>
                  <span>Целевых лидов</span>
                </div>
                <div>
                  <strong>10 млн.</strong>
                  <span>Средний чек, рублей</span>
                </div>
                <div>
                  <strong>1,5 млн.</strong>
                  <span>Бюджет, рублей</span>
                </div>
              </div>
            </Reveal>
            <Reveal className="case-card" delay={100}>
              <span className="case-index">Кейс 02</span>
              <h3>Выставка за 2 месяца (бренд-роль)</h3>
              <p>
                <b>Контекст:</b> отраслевой event в сжатые сроки.
              </p>
              <p>
                <b>Что делала:</b> управление пулом подрядчиков, дизайн / типографии / застройщики, контроль тайминга.
              </p>
              <div className="case-outcome">
                <strong>5 млн.</strong>
                <span>Бюджет, рублей</span>
              </div>
              <ul>
                <li>Проект реализован в срок</li>
                <li>Управляемая коммуникация с подрядчиками</li>
                <li>Сохранение качества под дедлайн</li>
              </ul>
            </Reveal>
            <Reveal className="case-card case-wide" delay={160}>
              <span className="case-index">Кейс 03</span>
              <h3>Автоматизация лидогенерации и учета</h3>
              <p>
                <b>Контекст:</b> лиды теряются, много ручного труда.
              </p>
              <p>
                <b>Что делала:</b> Telegram-бот для ведения клиента по воронке; интеграция форм Tilda с amoCRM;
                финансовая отчетность по рекламе в Excel.
              </p>
              <div className="case-tags">
                <span>Меньше потерь лидов</span>
                <span>Быстрее обработка</span>
                <span>Прозрачность по расходам и эффективности</span>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="contact-section section" id="contact">
          <Reveal>
            <p className="eyebrow">Контакты</p>
            <h2>Готова к диалогу</h2>
          </Reveal>
          <div className="contact-layout">
            <Reveal className="laptop-wrap" delay={80}>
              <MaskedImage src={laptop} mask={laptopMask} alt="Ноутбук" />
              <p>
                Предлагаю <span>30 минут</span>
                <br />
                созвона для обсуждения сотрудничества на длительный срок.
              </p>
            </Reveal>
            <Reveal className="contact-links" delay={160}>
              <a href="tel:+79229854496">
                <span>Telegram / Телефон</span>
                <strong>+7 (922) 985 44 96</strong>
                <i>↗</i>
              </a>
              <a href="mailto:rttchernikova@yandex.ru">
                <span>Email</span>
                <strong>rttchernikova@yandex.ru</strong>
                <i>↗</i>
              </a>
            </Reveal>
          </div>
          <div className="contact-footer">
            <span>Сниму операционную нагрузку</span>
            <span>Прозрачность по бюджету</span>
            <span>Измеримый результат event</span>
            <span>Автоматизация CRM и воронки</span>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
