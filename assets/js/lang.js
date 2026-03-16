/* ============================================================
   BERGMANN & CO. — Internationalization (i18n)
   Language switcher, browser detection, translation engine
   ============================================================ */
(function () {
  'use strict';

  var STORAGE_KEY = 'bc_lang';
  var SUPPORTED = ['de', 'en'];
  var DEFAULT = 'de';

  // ---- TRANSLATIONS ----
  var T = {
    de: {
      // Meta
      'meta.description': 'Innovative Capital & Financing Solutions. Wir unterstützen Unternehmen bei der Strukturierung, Beschaffung und Optimierung von Kapital.',
      'meta.og_description': 'Innovative Capital & Financing Solutions. Wir unterstützen Unternehmen bei der Strukturierung, Beschaffung und Optimierung von Kapital.',

      // Nav
      'nav.services': 'Dienstleistungen',
      'nav.process': 'Kundenprozess',
      'nav.industries': 'Branchen',
      'nav.contact': 'Kontakt',
      'nav.burger_label': 'Menü öffnen',

      // Lightbox
      'lightbox.close': 'Schließen',
      'lightbox.title': 'Kontaktieren Sie uns',
      'lightbox.subtitle': 'Ihr Expertenteam für maßgeschneiderte Finanzstrategien',
      'form.firstName': 'Vorname',
      'form.lastName': 'Nachname',
      'form.email': 'E-Mail',
      'form.company': 'Unternehmen',
      'form.message': 'Nachricht',
      'form.firstName_placeholder': 'Max',
      'form.lastName_placeholder': 'Mustermann',
      'form.email_placeholder': 'max@unternehmen.de',
      'form.company_placeholder': 'Unternehmen GmbH',
      'form.message_placeholder': 'Wie können wir Ihnen helfen?',
      'form.submit': 'Nachricht senden',
      'form.success_title': 'Vielen Dank!',
      'form.success_text': 'Wir haben Ihre Nachricht erhalten und melden uns zeitnah bei Ihnen.',

      // Hero
      'hero.badge': 'Innovative Kapital- & Finanzierungslösungen',
      'hero.title_line1': 'Financial Solutions',
      'hero.title_line2': 'for Scaling Businesses',
      'hero.subtitle': 'Mit einem tiefen Verständnis der komplexen Dynamiken des Kapitalmarktes bieten wir unseren Kunden innovative Ansätze zur Kapitalbeschaffung, Refinanzierung und zur Optimierung ihrer Kapitalstruktur.',
      'hero.cta_contact': 'Kontakt aufnehmen',
      'hero.cta_learn': 'Mehr erfahren',

      // Features
      'features.tag': 'Capital Solutions',
      'features.title': 'Kapitalmarkt-Expertise<br>für Ihr Wachstum',
      'features.card1_title': 'Alternativen zu traditionellen Finanzierungen',
      'features.card1_text': 'Die Landschaft des Kapitalmarkts erlebt eine Verschiebung hin zu alternativen Finanzierungsquellen. Entdecken Sie neue Wege abseits herkömmlicher Bankdarlehen.',
      'features.card2_title': 'Bedeutung strukturierter Produkte',
      'features.card2_text': 'Strukturierte Produkte und festverzinsliche Wertpapiere bieten Anlegern und Emittenten Flexibilität und können auf individuelle Risikopräferenzen zugeschnitten werden.',
      'features.card3_title': 'Rückgang bei klassischen Finanzierungen',
      'features.card3_text': 'Mit strengeren Regulierungen verlieren traditionelle Bankenfinanzierungen an Attraktivität. Unternehmen suchen effizientere Wege der Kapitalbeschaffung.',

      // Services
      'services.tag': 'Unsere Dienstleistungen',
      'services.title': 'Expertise über das gesamte<br>Spektrum der Finanzinstrumente',
      'services.desc': 'Unsere Expertise umfasst ein breites Spektrum an Finanzinstrumenten, darunter Unternehmensanleihen, syndizierte Kredite und strukturierte Finanzierungen.',
      'services.card1_tag': 'Wachstumskapital',
      'services.card1_title': 'Debt Capital Markets',
      'services.card1_text': 'Prozess der Erstellung und des Verkaufs von festverzinslichen Wertpapieren an Investoren zur Kapitalbeschaffung.',
      'services.card1_f1': 'Unternehmensanleihen',
      'services.card1_f2': 'Festverzinsliche Wertpapiere',
      'services.card1_f3': 'Kapitalstrukturierung',
      'services.card1_cta': 'Kontakt',
      'services.card2_tag': 'Mittelstand & Real Estate',
      'services.card2_title': 'Leveraged Finance &<br>Loan Solutions',
      'services.card2_text': 'Unser Team bietet Syndicated Loans, Senior Loans und Mezzanine-Finanzierungen für Unternehmen an, um ihre Finanzierungsbedürfnisse zu decken.',
      'services.card2_f1': 'Syndicated Loans',
      'services.card2_f2': 'Senior & Mezzanine',
      'services.card2_f3': 'Immobilienfinanzierung',
      'services.card2_cta': 'Kontakt',

      // Process
      'process.tag': 'Kundenprozess',
      'process.title': 'Starke Partner &<br>ein starkes Netzwerk',
      'process.step1_title': 'Bedarfsanalyse',
      'process.step1_text': 'Ermittlung Ihrer spezifischen Finanzierungsbedürfnisse und Ziele durch eine tiefgehende Analyse, um maßgeschneiderte Lösungen zu entwickeln.',
      'process.step2_title': 'Angebot',
      'process.step2_text': 'Erstellung eines individuellen Angebots basierend auf der Bedarfsanalyse, das die optimalen Finanzierungsoptionen und -strukturen umfasst.',
      'process.step3_title': 'Due Diligence',
      'process.step3_text': 'Detaillierte Prüfung der finanziellen Situation Ihres Unternehmens, um Risiken zu identifizieren und Transparenz zu schaffen.',
      'process.step4_title': 'Abwicklung',
      'process.step4_text': 'Effiziente und strukturierte Durchführung der Transaktion, einschließlich aller notwendigen Prozesse und Schritte.',
      'process.step5_title': 'Folgegeschäft',
      'process.step5_text': 'Nach erfolgreichem Abschluss, Identifikation weiterer Wachstums- und Optimierungspotenziale für zukünftige Geschäftsmöglichkeiten.',

      // Industries
      'industries.tag': 'Branchenfokus',
      'industries.title': 'Maßgeschneiderte Kapitalstrategien<br>für Ihre Branche',
      'industries.desc': 'Von der dynamischen Immobilienbranche über den lebhaften Mittelstand bis hin zu anspruchsvollen Hochverzinslichen Anleihen.',
      'industries.card1_title': 'Mittelstand',
      'industries.card1_text': 'Kapitalbeschaffungs- und Liquiditätslösungen für mittelständische Unternehmen zur Förderung ihres Wachstums.',
      'industries.card2_title': 'Real Estate',
      'industries.card2_text': 'Spezialisierung auf komplexe Immobilientransaktionen und -finanzierungen für nachhaltiges Wachstum.',
      'industries.card3_title': 'High Yield',
      'industries.card3_text': 'Fokussierung auf High-Yield-Anleihen und Corporate Bonds als Teil einer strategischen Finanzierungsplanung.',
      'industries.card4_title': 'Emissionen',
      'industries.card4_text': 'Expertise in der Strukturierung und Platzierung von Fremdemissionen und syndizierten Krediten.',

      // CTA Band
      'cta.title': 'Optimieren Sie Ihre Kapitalstruktur',
      'cta.tag': 'Individuelle Finanzstrategien',
      'cta.text': 'Wir spezialisieren uns auf das intelligente Engineering von Kapitalstrukturen, um Wachstum zu fördern, Wert zu schaffen und nachhaltige Erfolge zu sichern.',
      'cta.name_placeholder': 'Ihr Name',
      'cta.email_placeholder': 'Ihre E-Mail',
      'cta.message_placeholder': 'Wie können wir Ihnen helfen?',
      'cta.submit': 'Nachricht senden',

      // Footer
      'footer.desc': 'Innovative Capital & Financing Solutions. Wir unterstützen Unternehmen bei der Strukturierung, Beschaffung und Optimierung von Kapital.',
      'footer.nav_title': 'Navigation',
      'footer.home': 'Home',
      'footer.services': 'Dienstleistungen',
      'footer.process': 'Kundenprozess',
      'footer.industries': 'Branchen',
      'footer.legal_title': 'Rechtliches',
      'footer.impressum': 'Impressum',
      'footer.datenschutz': 'Datenschutz',
      'footer.contact': 'Kontakt',
      'footer.copy': '&copy; 2026 Bergmann & Co. Alle Rechte vorbehalten.',

      // Cookies
      'cookie.banner_text': 'Wir verwenden Cookies, um die Website zu betreiben, die Nutzung zu analysieren und relevante Inhalte bereitzustellen. Weitere Informationen finden Sie in unserer <a href="/datenschutz">Datenschutzerklärung</a>.',
      'cookie.accept_all': 'Alle akzeptieren',
      'cookie.deny': 'Ablehnen',
      'cookie.settings': 'Einstellungen',
      'cookie.modal_title': 'Cookie-Einstellungen',
      'cookie.modal_desc': 'Wählen Sie, welche Cookies Sie zulassen möchten. Notwendige Cookies sind immer aktiv, da sie für den Betrieb der Website erforderlich sind. Weitere Informationen in unserer <a href="/datenschutz">Datenschutzerklärung</a>.',
      'cookie.necessary': 'Notwendig',
      'cookie.always_active': 'Immer aktiv',
      'cookie.necessary_desc': 'Diese Cookies sind für das ordnungsgemäße Funktionieren der Website erforderlich und können nicht deaktiviert werden.',
      'cookie.analytics': 'Analyse',
      'cookie.analytics_desc': 'Helfen uns zu verstehen, wie Besucher mit der Website interagieren, um die Nutzererfahrung kontinuierlich zu verbessern.',
      'cookie.marketing': 'Marketing',
      'cookie.marketing_desc': 'Werden verwendet, um Ihnen relevante Werbeinhalte basierend auf Ihren Interessen anzuzeigen.',
      'cookie.personalization': 'Personalisierung',
      'cookie.personalization_desc': 'Ermöglichen es der Website, sich an Ihre Präferenzen zu erinnern und ein personalisiertes Erlebnis zu bieten.',
      'cookie.save_selection': 'Auswahl speichern',

      // Legal pages
      'legal.back': 'Zurück zur Startseite',
      'legal.impressum_title': 'Impressum',
      'legal.datenschutz_title': 'Datenschutzerklärung',

      // Impressum sections
      'impressum.s1_heading': 'Angaben gemäß §5 TMG',
      'impressum.s1_text': 'HESTIA Asset Development GmbH<br>Taunusanlage 9-10<br>60329 Frankfurt<br>Germany',
      'impressum.s1_director': 'Geschäftsführer: Maximilian Bergmann',
      'impressum.s2_heading': 'Kontakt',
      'impressum.s2_text': 'Telefon: +49 69 50 50 60 4965<br>E-Mail: <a href="mailto:info@bergmann-co.com">info@bergmann-co.com</a>',
      'impressum.s3_heading': 'Hinweis auf die EU-Streitschlichtung',
      'impressum.s3_text': 'Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>',
      'impressum.s4_heading': 'Haftungsausschluss: Haftung für Inhalte',
      'impressum.s4_text': 'Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine Gewähr übernehmen. Als Diensteanbieter gelten die Verpflichtungen gemäß §7 Abs.1 TMG für eigene Inhalte. Nach §§ 8 bis 10 TMG besteht jedoch keine Überwachungspflicht für fremde Informationen. Haftung entsteht erst nach Kenntnis konkreter Rechtsverletzungen, welche dann unverzüglich entfernt werden.',
      'impressum.s5_heading': 'Haftung für Links',
      'impressum.s5_text': 'Das Angebot enthält Links zu externen Webseiten, auf deren Inhalte kein Einfluss besteht. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Eine kontinuierliche Kontrolle ist ohne konkrete Anhaltspunkte nicht erforderlich. Bei erkannten Verstößen werden solche Links sofort entfernt.',
      'impressum.s6_heading': 'Urheberrecht',
      'impressum.s6_text': 'Vom Seitenbetreiber erstellte Werke unterliegen deutschem Urheberrecht. Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung. Private, nichtkommerzielle Nutzung ist gestattet. Drittinhalte werden entsprechend gekennzeichnet und respektiert.',

      // Datenschutz sections
      'datenschutz.num1': '1. Datenschutz auf einen Blick',
      'datenschutz.s1_heading': 'Allgemeine Hinweise',
      'datenschutz.s1_text': 'Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie unsere Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.',
      'datenschutz.s2_heading': 'Datenerfassung auf unserer Website',
      'datenschutz.s2a_subheading': 'Wer ist verantwortlich für die Datenerfassung?',
      'datenschutz.s2a_text': 'Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.',
      'datenschutz.s2b_subheading': 'Wie erfassen wir Ihre Daten?',
      'datenschutz.s2b_text': 'Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen, z.B. über ein Kontaktformular. Andere Daten werden automatisch beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).',
      'datenschutz.s2c_subheading': 'Wofür nutzen wir Ihre Daten?',
      'datenschutz.s2c_text': 'Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.',
      'datenschutz.s2d_subheading': 'Welche Rechte haben Sie bezüglich Ihrer Daten?',
      'datenschutz.s2d_text': 'Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung, Sperrung oder Löschung dieser Daten zu verlangen. Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit an uns wenden. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.',
      'datenschutz.s3_heading': 'Analyse-Tools und Drittanbieter-Tools',
      'datenschutz.s3_text': 'Beim Besuch unserer Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit Cookies und mit sogenannten Analyseprogrammen. Die Analyse Ihres Surf-Verhaltens erfolgt in der Regel anonym. Sie können dieser Analyse widersprechen.',
      'datenschutz.num2': '2. Allgemeine Hinweise und Pflichtinformationen',
      'datenschutz.s4_heading': 'Datenschutz',
      'datenschutz.s4_text': 'Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.',
      'datenschutz.s5_heading': 'Verantwortliche Stelle',
      'datenschutz.s5_text': 'HESTIA Asset Development GmbH<br>Taunusanlage 9-10<br>60329 Frankfurt<br>Germany',
      'datenschutz.s5_director': 'Geschäftsführer: Maximilian Bergmann',
      'datenschutz.s6_heading': 'Widerruf Ihrer Einwilligung zur Datenverarbeitung',
      'datenschutz.s6_text': 'Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.',
      'datenschutz.s7_heading': 'Beschwerderecht bei der zuständigen Aufsichtsbehörde',
      'datenschutz.s7_text': 'Im Falle datenschutzrechtlicher Verstöße steht dem Betroffenen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu. Eine Liste der Datenschutzbeauftragten finden Sie unter: <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank" rel="noopener">www.bfdi.bund.de</a>',
      'datenschutz.s8_heading': 'Recht auf Datenübertragbarkeit',
      'datenschutz.s8_text': 'Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen.',
      'datenschutz.s9_heading': 'SSL- bzw. TLS-Verschlüsselung',
      'datenschutz.s9_text': 'Diese Seite nutzt aus Sicherheitsgründen eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://" auf „https://" wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.',
      'datenschutz.s10_heading': 'Auskunft, Sperrung, Löschung',
      'datenschutz.s10_text': 'Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung, Sperrung oder Löschung dieser Daten.',
      'datenschutz.s11_heading': 'Widerspruch gegen Werbe-Mails',
      'datenschutz.s11_text': 'Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen vor.',
      'datenschutz.num3': '3. Datenerfassung auf unserer Website',
      'datenschutz.s12_heading': 'Cookies',
      'datenschutz.s12_text1': 'Unsere Internetseiten verwenden teilweise sogenannte Cookies. Cookies richten auf Ihrem Rechner keinen Schaden an und enthalten keine Viren. Cookies dienen dazu, unser Angebot nutzerfreundlicher, effektiver und sicherer zu machen. Cookies sind kleine Textdateien, die auf Ihrem Rechner abgelegt werden und die Ihr Browser speichert.',
      'datenschutz.s12_text2': 'Die meisten der von uns verwendeten Cookies sind sogenannte „Session-Cookies". Sie werden nach Ende Ihres Besuchs automatisch gelöscht. Andere Cookies bleiben auf Ihrem Endgerät gespeichert bis Sie diese löschen. Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden.',
      'datenschutz.s12_text3': 'Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
      'datenschutz.s13_heading': 'Server-Log-Dateien',
      'datenschutz.s13_text1': 'Der Provider der Seiten erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage und IP-Adresse.',
      'datenschutz.s13_text2': 'Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
      'datenschutz.s14_heading': 'Kontaktformular',
      'datenschutz.s14_text1': 'Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.',
      'datenschutz.s14_text2': 'Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO (Einwilligung). Die Daten werden gelöscht, sobald der Zweck der Speicherung entfällt. Gesetzliche Aufbewahrungsfristen bleiben unberührt.',
      'datenschutz.num4': '4. Analyse-Tools und Werbung',
      'datenschutz.s15_heading': 'Google Analytics',
      'datenschutz.s15_text1': 'Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics. Anbieter ist die Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics verwendet sogenannte „Cookies". Die durch den Cookie erzeugten Informationen über Ihre Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.',
      'datenschutz.s15_text2': 'Die IP-Anonymisierung ist auf dieser Website aktiv. Ihre IP-Adresse wird von Google innerhalb von Mitgliedstaaten der EU oder des EWR zuvor gekürzt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
      'datenschutz.s15_text3': 'Sie können die Erfassung durch Google Analytics verhindern, indem Sie das Browser-Add-on herunterladen: <a href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener">https://tools.google.com/dlpage/gaoptout</a>',
      'datenschutz.s16_heading': 'Google reCAPTCHA',
      'datenschutz.s16_text': 'Wir nutzen Google reCAPTCHA zum Schutz vor Bots. Es prüft, ob die Dateneingabe durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Dabei werden verschiedene Informationen wie IP-Adresse, Verweildauer und Mausbewegungen analysiert. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
      'datenschutz.num5': '5. Plugins und Tools',
      'datenschutz.s17_heading': 'Google Web Fonts',
      'datenschutz.s17_text1': 'Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten sogenannte Web Fonts, die von Google bereitgestellt werden. Beim Aufruf einer Seite lädt Ihr Browser die benötigten Web Fonts in Ihren Browsercache. Dabei wird Ihre IP-Adresse an Google übermittelt. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.',
      'datenschutz.s17_text2': 'Weitere Informationen: <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener">https://developers.google.com/fonts/faq</a>',

      // Card pages
      'card.vcard': 'Kontaktdaten',
      'card.about': 'Über uns',
      'card.about_text': 'Mit einem tiefen Verständnis der komplexen Dynamiken des Kapitalmarktes bieten wir unseren Kunden innovative Ansätze zur Kapitalbeschaffung, Refinanzierung und zur Optimierung ihrer Kapitalstruktur.',
      'card.email': 'E-Mail',
      'card.mobile': 'Mobil',
      'card.phone': 'Telefon',
      'card.address': 'Adresse',

      // JS dynamic strings
      'js.sending': 'Wird gesendet...',
      'js.sent': 'Gesendet ✓',
      'js.error_retry': 'Fehler – bitte erneut versuchen',
      'js.error_retry_short': 'Fehler – erneut versuchen',
      'js.subject_contact': 'Neue Kontaktanfrage – Bergmann & Co.',
      'js.subject_cta': 'Neue Anfrage (CTA) – Bergmann & Co.',
    },

    en: {
      // Meta
      'meta.description': 'Innovative Capital & Financing Solutions. We support companies in structuring, procuring, and optimizing capital.',
      'meta.og_description': 'Innovative Capital & Financing Solutions. We support companies in structuring, procuring, and optimizing capital.',

      // Nav
      'nav.services': 'Services',
      'nav.process': 'Process',
      'nav.industries': 'Industries',
      'nav.contact': 'Contact',
      'nav.burger_label': 'Open menu',

      // Lightbox
      'lightbox.close': 'Close',
      'lightbox.title': 'Get in Touch',
      'lightbox.subtitle': 'Your expert team for tailored financial strategies',
      'form.firstName': 'First Name',
      'form.lastName': 'Last Name',
      'form.email': 'Email',
      'form.company': 'Company',
      'form.message': 'Message',
      'form.firstName_placeholder': 'John',
      'form.lastName_placeholder': 'Smith',
      'form.email_placeholder': 'john@company.com',
      'form.company_placeholder': 'Company Ltd.',
      'form.message_placeholder': 'How can we help you?',
      'form.submit': 'Send Message',
      'form.success_title': 'Thank You!',
      'form.success_text': 'We have received your message and will get back to you shortly.',

      // Hero
      'hero.badge': 'Innovative Capital & Financing Solutions',
      'hero.title_line1': 'Financial Solutions',
      'hero.title_line2': 'for Scaling Businesses',
      'hero.subtitle': 'With a deep understanding of the complex dynamics of capital markets, we offer our clients innovative approaches to capital procurement, refinancing, and optimization of their capital structure.',
      'hero.cta_contact': 'Get in Touch',
      'hero.cta_learn': 'Learn More',

      // Features
      'features.tag': 'Capital Solutions',
      'features.title': 'Capital Market Expertise<br>for Your Growth',
      'features.card1_title': 'Alternatives to Traditional Financing',
      'features.card1_text': 'The capital markets landscape is shifting towards alternative financing sources. Discover new paths beyond traditional bank loans.',
      'features.card2_title': 'Importance of Structured Products',
      'features.card2_text': 'Structured products and fixed-income securities offer investors and issuers flexibility and can be tailored to individual risk preferences.',
      'features.card3_title': 'Decline in Traditional Financing',
      'features.card3_text': 'With stricter regulations, traditional bank financing is losing its appeal. Companies are seeking more efficient ways to raise capital.',

      // Services
      'services.tag': 'Our Services',
      'services.title': 'Expertise Across the Full<br>Spectrum of Financial Instruments',
      'services.desc': 'Our expertise covers a broad spectrum of financial instruments, including corporate bonds, syndicated loans, and structured financing.',
      'services.card1_tag': 'Growth Capital',
      'services.card1_title': 'Debt Capital Markets',
      'services.card1_text': 'The process of creating and selling fixed-income securities to investors to raise capital.',
      'services.card1_f1': 'Corporate Bonds',
      'services.card1_f2': 'Fixed-Income Securities',
      'services.card1_f3': 'Capital Structuring',
      'services.card1_cta': 'Contact',
      'services.card2_tag': 'Mid-Market & Real Estate',
      'services.card2_title': 'Leveraged Finance &<br>Loan Solutions',
      'services.card2_text': 'Our team offers Syndicated Loans, Senior Loans, and Mezzanine financing for companies to meet their financing needs.',
      'services.card2_f1': 'Syndicated Loans',
      'services.card2_f2': 'Senior & Mezzanine',
      'services.card2_f3': 'Real Estate Financing',
      'services.card2_cta': 'Contact',

      // Process
      'process.tag': 'Client Process',
      'process.title': 'Strong Partners &<br>a Strong Network',
      'process.step1_title': 'Needs Analysis',
      'process.step1_text': 'Identifying your specific financing needs and goals through in-depth analysis to develop tailored solutions.',
      'process.step2_title': 'Proposal',
      'process.step2_text': 'Creating a customized proposal based on the needs analysis, covering optimal financing options and structures.',
      'process.step3_title': 'Due Diligence',
      'process.step3_text': 'Detailed examination of your company\'s financial situation to identify risks and ensure transparency.',
      'process.step4_title': 'Execution',
      'process.step4_text': 'Efficient and structured execution of the transaction, including all necessary processes and steps.',
      'process.step5_title': 'Follow-Up',
      'process.step5_text': 'After successful completion, identification of further growth and optimization opportunities for future business.',

      // Industries
      'industries.tag': 'Industry Focus',
      'industries.title': 'Tailored Capital Strategies<br>for Your Industry',
      'industries.desc': 'From the dynamic real estate sector through the vibrant mid-market to sophisticated high-yield bonds.',
      'industries.card1_title': 'Mid-Market',
      'industries.card1_text': 'Capital procurement and liquidity solutions for mid-market companies to support their growth.',
      'industries.card2_title': 'Real Estate',
      'industries.card2_text': 'Specializing in complex real estate transactions and financing for sustainable growth.',
      'industries.card3_title': 'High Yield',
      'industries.card3_text': 'Focusing on high-yield bonds and corporate bonds as part of strategic financial planning.',
      'industries.card4_title': 'Issuances',
      'industries.card4_text': 'Expertise in structuring and placing third-party issuances and syndicated loans.',

      // CTA Band
      'cta.title': 'Optimize Your Capital Structure',
      'cta.tag': 'Individual Financial Strategies',
      'cta.text': 'We specialize in the intelligent engineering of capital structures to promote growth, create value, and ensure sustainable success.',
      'cta.name_placeholder': 'Your Name',
      'cta.email_placeholder': 'Your Email',
      'cta.message_placeholder': 'How can we help you?',
      'cta.submit': 'Send Message',

      // Footer
      'footer.desc': 'Innovative Capital & Financing Solutions. We support companies in structuring, procuring, and optimizing capital.',
      'footer.nav_title': 'Navigation',
      'footer.home': 'Home',
      'footer.services': 'Services',
      'footer.process': 'Process',
      'footer.industries': 'Industries',
      'footer.legal_title': 'Legal',
      'footer.impressum': 'Legal Notice',
      'footer.datenschutz': 'Privacy Policy',
      'footer.contact': 'Contact',
      'footer.copy': '&copy; 2026 Bergmann & Co. All rights reserved.',

      // Cookies
      'cookie.banner_text': 'We use cookies to operate the website, analyze usage, and provide relevant content. For more information, please see our <a href="/datenschutz">Privacy Policy</a>.',
      'cookie.accept_all': 'Accept All',
      'cookie.deny': 'Deny',
      'cookie.settings': 'Settings',
      'cookie.modal_title': 'Cookie Settings',
      'cookie.modal_desc': 'Choose which cookies you want to allow. Required cookies are always active as they are necessary for the website to function. For more information, see our <a href="/datenschutz">Privacy Policy</a>.',
      'cookie.necessary': 'Required',
      'cookie.always_active': 'Always Active',
      'cookie.necessary_desc': 'These cookies are required for the proper functioning of the website and cannot be disabled.',
      'cookie.analytics': 'Analytics',
      'cookie.analytics_desc': 'Help us understand how visitors interact with the website to continuously improve the user experience.',
      'cookie.marketing': 'Marketing',
      'cookie.marketing_desc': 'Used to display relevant advertising content based on your interests.',
      'cookie.personalization': 'Personalization',
      'cookie.personalization_desc': 'Allow the website to remember your preferences and provide a personalized experience.',
      'cookie.save_selection': 'Save Selection',

      // Legal pages
      'legal.back': 'Back to Home',
      'legal.impressum_title': 'Legal Notice',
      'legal.datenschutz_title': 'Privacy Policy',

      // Impressum sections
      'impressum.s1_heading': 'Information pursuant to §5 TMG',
      'impressum.s1_text': 'HESTIA Asset Development GmbH<br>Taunusanlage 9-10<br>60329 Frankfurt<br>Germany',
      'impressum.s1_director': 'Managing Director: Maximilian Bergmann',
      'impressum.s2_heading': 'Contact',
      'impressum.s2_text': 'Phone: +49 69 50 50 60 4965<br>Email: <a href="mailto:info@bergmann-co.com">info@bergmann-co.com</a>',
      'impressum.s3_heading': 'EU Dispute Resolution',
      'impressum.s3_text': 'The European Commission provides a platform for online dispute resolution (ODR): <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr</a>',
      'impressum.s4_heading': 'Disclaimer: Liability for Content',
      'impressum.s4_text': 'The contents of our pages have been created with the utmost care. However, we cannot guarantee the accuracy, completeness, or timeliness of the content. As a service provider, we are responsible for our own content pursuant to §7(1) TMG. However, pursuant to §§ 8-10 TMG, we are not obligated to monitor transmitted or stored third-party information. Liability arises only upon knowledge of specific legal violations, which will be promptly removed.',
      'impressum.s5_heading': 'Liability for Links',
      'impressum.s5_text': 'Our website contains links to external websites over whose content we have no control. Linked pages were checked for possible legal violations at the time of linking. Continuous monitoring is not reasonable without concrete evidence. Upon notification of violations, such links will be removed immediately.',
      'impressum.s6_heading': 'Copyright',
      'impressum.s6_text': 'Content created by the site operator is subject to German copyright law. Reproduction, processing, distribution, and any form of use beyond the scope of copyright law require written consent. Private, non-commercial use is permitted. Third-party content is appropriately marked and respected.',

      // Datenschutz sections
      'datenschutz.num1': '1. Privacy at a Glance',
      'datenschutz.s1_heading': 'General Information',
      'datenschutz.s1_text': 'The following information provides a simple overview of what happens to your personal data when you visit our website. Personal data is any data that can be used to personally identify you.',
      'datenschutz.s2_heading': 'Data Collection on Our Website',
      'datenschutz.s2a_subheading': 'Who is responsible for data collection?',
      'datenschutz.s2a_text': 'Data processing on this website is carried out by the website operator. Their contact details can be found in the legal notice of this website.',
      'datenschutz.s2b_subheading': 'How do we collect your data?',
      'datenschutz.s2b_text': 'Your data is collected when you provide it to us, e.g., via a contact form. Other data is automatically collected by our IT systems when you visit the website. This is primarily technical data (e.g., browser, operating system, or time of page access).',
      'datenschutz.s2c_subheading': 'What do we use your data for?',
      'datenschutz.s2c_text': 'Some data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.',
      'datenschutz.s2d_subheading': 'What rights do you have regarding your data?',
      'datenschutz.s2d_text': 'You have the right to receive free information about the origin, recipient, and purpose of your stored personal data at any time. You also have the right to request correction, blocking, or deletion of this data. You can contact us at any time regarding this and other data protection questions. You also have the right to lodge a complaint with the competent supervisory authority.',
      'datenschutz.s3_heading': 'Analytics and Third-Party Tools',
      'datenschutz.s3_text': 'When visiting our website, your browsing behavior may be statistically evaluated. This is primarily done with cookies and analytics programs. The analysis of your browsing behavior is generally anonymous. You can object to this analysis.',
      'datenschutz.num2': '2. General Information and Mandatory Disclosures',
      'datenschutz.s4_heading': 'Data Protection',
      'datenschutz.s4_text': 'The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with statutory data protection regulations and this privacy policy.',
      'datenschutz.s5_heading': 'Responsible Party',
      'datenschutz.s5_text': 'HESTIA Asset Development GmbH<br>Taunusanlage 9-10<br>60329 Frankfurt<br>Germany',
      'datenschutz.s5_director': 'Managing Director: Maximilian Bergmann',
      'datenschutz.s6_heading': 'Revocation of Your Consent to Data Processing',
      'datenschutz.s6_text': 'Many data processing operations are only possible with your express consent. You may revoke consent already given at any time. An informal notification by email to us is sufficient. The legality of data processing carried out before revocation remains unaffected.',
      'datenschutz.s7_heading': 'Right to Complain to the Supervisory Authority',
      'datenschutz.s7_text': 'In the event of data protection violations, the data subject has the right to lodge a complaint with the competent supervisory authority. A list of data protection officers can be found at: <a href="https://www.bfdi.bund.de/DE/Infothek/Anschriften_Links/anschriften_links-node.html" target="_blank" rel="noopener">www.bfdi.bund.de</a>',
      'datenschutz.s8_heading': 'Right to Data Portability',
      'datenschutz.s8_text': 'You have the right to receive data that we process automatically on the basis of your consent or in fulfillment of a contract, in a commonly used, machine-readable format.',
      'datenschutz.s9_heading': 'SSL/TLS Encryption',
      'datenschutz.s9_text': 'This site uses SSL/TLS encryption for security reasons. You can recognize an encrypted connection by the browser address bar changing from "http://" to "https://" and by the lock icon in your browser bar.',
      'datenschutz.s10_heading': 'Information, Blocking, Deletion',
      'datenschutz.s10_text': 'Within the framework of applicable legal provisions, you have the right to free information about your stored personal data, its origin and recipients, and the purpose of data processing, and, if applicable, a right to correction, blocking, or deletion of this data.',
      'datenschutz.s11_heading': 'Objection to Promotional Emails',
      'datenschutz.s11_text': 'The use of contact data published as part of the legal notice obligation for the transmission of unsolicited advertising and information materials is hereby objected to. The site operators expressly reserve the right to take legal action in the event of unsolicited promotional information.',
      'datenschutz.num3': '3. Data Collection on Our Website',
      'datenschutz.s12_heading': 'Cookies',
      'datenschutz.s12_text1': 'Our website partially uses cookies. Cookies do not cause any damage to your computer and do not contain viruses. Cookies serve to make our website more user-friendly, effective, and secure. Cookies are small text files stored on your computer by your browser.',
      'datenschutz.s12_text2': 'Most of the cookies we use are so-called "session cookies." They are automatically deleted after your visit. Other cookies remain stored on your device until you delete them. You can configure your browser to inform you about the setting of cookies.',
      'datenschutz.s12_text3': 'Legal basis: Art. 6(1)(f) GDPR.',
      'datenschutz.s13_heading': 'Server Log Files',
      'datenschutz.s13_text1': 'The website provider automatically collects and stores information in server log files, which your browser automatically transmits to us. These are: browser type and version, operating system, referrer URL, hostname of the accessing computer, time of server request, and IP address.',
      'datenschutz.s13_text2': 'This data is not merged with other data sources. Legal basis: Art. 6(1)(f) GDPR.',
      'datenschutz.s14_heading': 'Contact Form',
      'datenschutz.s14_text1': 'If you send us inquiries via the contact form, your details from the inquiry form, including the contact details you provide, will be stored by us for the purpose of processing the inquiry and for follow-up questions. We do not share this data without your consent.',
      'datenschutz.s14_text2': 'Legal basis: Art. 6(1)(a) GDPR (consent). Data will be deleted once the purpose of storage no longer applies. Statutory retention periods remain unaffected.',
      'datenschutz.num4': '4. Analytics and Advertising',
      'datenschutz.s15_heading': 'Google Analytics',
      'datenschutz.s15_text1': 'This website uses functions of the web analytics service Google Analytics. The provider is Google Inc., 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA. Google Analytics uses "cookies." The information generated by the cookie about your use of this website is usually transmitted to and stored on a Google server in the USA.',
      'datenschutz.s15_text2': 'IP anonymization is active on this website. Your IP address will be truncated by Google within member states of the EU or the EEA. Legal basis: Art. 6(1)(f) GDPR.',
      'datenschutz.s15_text3': 'You can prevent data collection by Google Analytics by downloading the browser add-on: <a href="https://tools.google.com/dlpage/gaoptout?hl=en" target="_blank" rel="noopener">https://tools.google.com/dlpage/gaoptout</a>',
      'datenschutz.s16_heading': 'Google reCAPTCHA',
      'datenschutz.s16_text': 'We use Google reCAPTCHA for bot protection. It checks whether data input is made by a human or by an automated program. Various information such as IP address, time spent, and mouse movements are analyzed. Legal basis: Art. 6(1)(f) GDPR.',
      'datenschutz.num5': '5. Plugins and Tools',
      'datenschutz.s17_heading': 'Google Web Fonts',
      'datenschutz.s17_text1': 'This site uses web fonts provided by Google for uniform font rendering. When you access a page, your browser loads the required web fonts into its cache. Your IP address is transmitted to Google. Legal basis: Art. 6(1)(f) GDPR.',
      'datenschutz.s17_text2': 'More information: <a href="https://developers.google.com/fonts/faq" target="_blank" rel="noopener">https://developers.google.com/fonts/faq</a>',

      // Card pages
      'card.vcard': 'Contact Details',
      'card.about': 'About Us',
      'card.about_text': 'With a deep understanding of the complex dynamics of capital markets, we offer our clients innovative approaches to capital procurement, refinancing, and optimization of their capital structure.',
      'card.email': 'Email',
      'card.mobile': 'Mobile',
      'card.phone': 'Phone',
      'card.address': 'Address',

      // JS dynamic strings
      'js.sending': 'Sending...',
      'js.sent': 'Sent ✓',
      'js.error_retry': 'Error – please try again',
      'js.error_retry_short': 'Error – try again',
      'js.subject_contact': 'New Contact Request – Bergmann & Co.',
      'js.subject_cta': 'New Request (CTA) – Bergmann & Co.',
    }
  };

  // ---- LANGUAGE DETECTION & PERSISTENCE ----
  function getSavedLang() {
    try { return localStorage.getItem(STORAGE_KEY); } catch (e) { return null; }
  }

  function saveLang(lang) {
    try { localStorage.setItem(STORAGE_KEY, lang); } catch (e) {}
  }

  function detectBrowserLang() {
    var nav = navigator.language || navigator.userLanguage || '';
    var primary = nav.split('-')[0].toLowerCase();
    return SUPPORTED.indexOf(primary) !== -1 ? primary : DEFAULT;
  }

  function getCurrentLang() {
    var saved = getSavedLang();
    if (saved && SUPPORTED.indexOf(saved) !== -1) return saved;
    return detectBrowserLang();
  }

  // ---- TRANSLATION ENGINE ----
  function t(key, lang) {
    lang = lang || getCurrentLang();
    return (T[lang] && T[lang][key]) || (T[DEFAULT] && T[DEFAULT][key]) || key;
  }

  function applyTranslations(lang) {
    // Set html lang attribute
    document.documentElement.lang = lang;

    // Update meta tags
    var metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t('meta.description', lang));
    var ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', t('meta.og_description', lang));
    var ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute('content', lang === 'de' ? 'de_DE' : 'en_US');

    // Translate all elements with data-i18n
    var elements = document.querySelectorAll('[data-i18n]');
    for (var i = 0; i < elements.length; i++) {
      var el = elements[i];
      var key = el.getAttribute('data-i18n');
      var val = t(key, lang);
      el.innerHTML = val;
    }

    // Translate placeholders
    var placeholders = document.querySelectorAll('[data-i18n-placeholder]');
    for (var j = 0; j < placeholders.length; j++) {
      var ph = placeholders[j];
      var phKey = ph.getAttribute('data-i18n-placeholder');
      ph.setAttribute('placeholder', t(phKey, lang));
    }

    // Translate aria-labels
    var ariaEls = document.querySelectorAll('[data-i18n-aria]');
    for (var k = 0; k < ariaEls.length; k++) {
      var ae = ariaEls[k];
      var ariaKey = ae.getAttribute('data-i18n-aria');
      ae.setAttribute('aria-label', t(ariaKey, lang));
    }

    // Update active switcher state
    var switches = document.querySelectorAll('.lang-switch__btn');
    for (var s = 0; s < switches.length; s++) {
      var btn = switches[s];
      if (btn.getAttribute('data-lang') === lang) {
        btn.classList.add('is-active');
      } else {
        btn.classList.remove('is-active');
      }
    }
  }

  function switchLang(lang) {
    if (SUPPORTED.indexOf(lang) === -1) return;
    saveLang(lang);
    applyTranslations(lang);
  }

  // ---- INIT ----
  function init() {
    var lang = getCurrentLang();
    saveLang(lang);
    applyTranslations(lang);

    // Bind language switcher buttons
    document.addEventListener('click', function (e) {
      var btn = e.target.closest('.lang-switch__btn');
      if (btn) {
        e.preventDefault();
        var newLang = btn.getAttribute('data-lang');
        if (newLang) switchLang(newLang);
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for main.js to use
  window.bcLang = {
    t: function (key) { return t(key, getCurrentLang()); },
    current: getCurrentLang,
    switch: switchLang
  };
})();
