/*
 * ═══════════════════════════════════════════════════════════════
 *  CONFERENCE DATA
 *  To add a new conference, copy the template below and fill in
 *  the fields. Then paste it into the array.
 * ═══════════════════════════════════════════════════════════════
 *
 *  TEMPLATE — copy & paste this block:
 *
 *  {
 *    title: "ABBREV 2026 – Full Conference Name",
 *    month: "Jun",              // 3-letter month: Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec
 *    day: "15",                 // Day of month (start date)
 *    year: "2026",
 *    location: "City, Country",
 *    topic: "Your Topic",       // See topic categories below
 *    rank: "A*",                // CORE ranking: "A*", "A", "B", "C", or "" if unknown
 *    paperDeadline: "Jan 15, 2026",
 *    notificationDate: "Mar 01, 2026",
 *    cameraReady: "Apr 05, 2026",
 *    url: "https://example.com"
 *  },
 *
 * ═══════════════════════════════════════════════════════════════
 *
 *  TOPIC CATEGORIES (use one of these exactly):
 *    Machine Learning      — ML, Deep Learning, General AI, Graph ML
 *    Computer Vision       — CV, Pattern Recognition, Image Processing
 *    Health Informatics    — Medical Imaging, Medical AI, Digital Health, Bioinformatics
 *    NLP                   — Natural Language Processing
 *    Data Mining & IR      — Data Mining, Information Retrieval, Data Engineering, Recommender Systems
 *    Web & Networks        — Web, Web Services, Networking
 *    Security              — Cybersecurity, Privacy
 *    Software Engineering
 *    Robotics
 *    Cloud Computing       — Cloud, Edge, Quantum
 *
 * ═══════════════════════════════════════════════════════════════
 */

const conferences = [

  // ── Machine Learning & AI ──────────────────────────────────

  {
    // Source: https://icml.cc/Conferences/2026 & /CallForPapers
    title: "ICML 2026 – International Conference on Machine Learning",
    month: "Jul", day: "6", year: "2026",
    location: "Seoul, South Korea",
    topic: "Machine Learning",
    rank: "A*",
    paperDeadline: "Jan 28, 2026",
    notificationDate: "Apr 30, 2026",
    cameraReady: "TBD",
    url: "https://icml.cc/Conferences/2026"
  },
  {
    title: "NeurIPS 2026 – Conference on Neural Information Processing Systems",
    month: "Dec", day: "06", year: "2026",
    location: "Sydney, Australia",
    topic: "Machine Learning",
    rank: "A*",
    paperDeadline: "May 07, 2026",
    notificationDate: "Sep 22, 2026",
    cameraReady: "Oct 20, 2026",
    url: "https://neurips.cc/Conferences/2026"
  },
  {
    title: "AAAI 2027 – AAAI Conference on Artificial Intelligence",
    month: "Feb", day: "16", year: "2027",
    location: "Montréal, Canada",
    topic: "Machine Learning",
    rank: "A*",
    paperDeadline: "Sep 10, 2026",
    notificationDate: "Dec 05, 2026",
    cameraReady: "Jan 05, 2027",
    url: "https://aaai.org/conference/aaai/aaai-27/"
  },
  {
    title: "ICLR 2027 – International Conference on Learning Representations",
    month: "Feb", day: "08", year: "2027",
    location: "Lisbon, Portugal",
    topic: "Machine Learning",
    rank: "A*",
    paperDeadline: "Sep 30, 2026",
    notificationDate: "Jan 15, 2027",
    cameraReady: "TBD",
    url: "https://iclr.cc/"
  },
  {
    title: "LoG 2026 – Learning on Graphs Conference",
    month: "Dec", day: "10", year: "2026",
    location: "Virtual/TBD",
    topic: "Machine Learning",
    rank: "A",
    paperDeadline: "Sep 15, 2026",
    notificationDate: "Nov 05, 2026",
    cameraReady: "Nov 25, 2026",
    url: "https://www.logconference.org/"
  },

  // ── Computer Vision ────────────────────────────────────────

  {
    // Source: https://cvpr.thecvf.com/Conferences/2026
    title: "CVPR 2026 – IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    month: "Jun", day: "3", year: "2026",
    location: "Denver, USA",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Nov 13, 2025",
    notificationDate: "Feb 20, 2026",
    cameraReady: "TBD",
    url: "https://cvpr.thecvf.com/Conferences/2026"
  },
  {
    // Note: ICCV is odd-year; next is 2025, not 2026
    title: "ICCV 2025 – IEEE International Conference on Computer Vision",
    month: "Oct", day: "19", year: "2025",
    location: "Honolulu, USA",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Mar 07, 2025",
    notificationDate: "Jun 25, 2025",
    cameraReady: "TBD",
    url: "https://iccv.thecvf.com/Conferences/2025"
  },
  {
    // Source: https://eccv.ecva.net/Conferences/2026
    title: "ECCV 2026 – European Conference on Computer Vision",
    month: "Sep", day: "8", year: "2026",
    location: "Malmö, Sweden",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Mar 05, 2026",
    notificationDate: "Jun 17, 2026",
    cameraReady: "Jun 26, 2026",
    url: "https://eccv.ecva.net/Conferences/2026"
  },
  {
    // Source: https://wacv.thecvf.com/Conferences/2026/Dates
    title: "WACV 2026 – IEEE Winter Conference on Applications of Computer Vision",
    month: "Mar", day: "6", year: "2026",
    location: "Tucson, USA",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Sep 19, 2025",
    notificationDate: "Nov 06, 2025",
    cameraReady: "TBD",
    url: "https://wacv.thecvf.com/Conferences/2026"
  },
  {
    // Source: https://bmvc2026.bmva.org/calls/call-for-papers/
    title: "BMVC 2026 – British Machine Vision Conference",
    month: "Nov", day: "23", year: "2026",
    location: "Lancaster, UK",
    topic: "Computer Vision",
    rank: "A",
    paperDeadline: "May 29, 2026",
    notificationDate: "Aug 07, 2026",
    cameraReady: "Aug 28, 2026",
    url: "https://bmvc2026.bmva.org/"
  },
  {
    // Source: https://icpr2026.org/dates.html
    title: "ICPR 2026 – International Conference on Pattern Recognition",
    month: "Aug", day: "17", year: "2026",
    location: "Lyon, France",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Jan 10, 2026",
    notificationDate: "Mar 31, 2026",
    cameraReady: "May 04, 2026",
    url: "https://icpr2026.org/"
  },
  {
    // Source: https://2026.ieeeicip.org/important-dates/
    title: "ICIP 2026 – IEEE International Conference on Image Processing",
    month: "Sep", day: "13", year: "2026",
    location: "Tampere, Finland",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Feb 04, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://2026.ieeeicip.org/"
  },
  {
    title: "ACCV 2026 – Asian Conference on Computer Vision",
    month: "Dec", day: "14", year: "2026",
    location: "Osaka, Japan",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Jul 05, 2026",
    notificationDate: "Sep 15, 2026",
    cameraReady: "Oct 10, 2026",
    url: "https://accv2026.org/"
  },
  {
    title: "WACV 2027 – IEEE Winter Conference on Applications of Computer Vision",
    month: "Mar", day: "01", year: "2027",
    location: "TBD",
    topic: "Computer Vision",
    rank: "A",
    paperDeadline: "Jul 18, 2026",
    notificationDate: "Oct 27, 2026",
    cameraReady: "Nov 15, 2026",
    url: "https://wacv2027.thecvf.com/"
  },
  {
    title: "CVPR 2027 – IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    month: "Jun", day: "19", year: "2027",
    location: "Seattle, USA",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Nov 01, 2026",
    notificationDate: "Feb 24, 2027",
    cameraReady: "Mar 20, 2027",
    url: "https://cvpr.thecvf.com/"
  },
  {
    title: "ICCV 2027 – IEEE International Conference on Computer Vision",
    month: "Oct", day: "24", year: "2027",
    location: "TBD",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Mar 07, 2027",
    notificationDate: "Jun 25, 2027",
    cameraReady: "Jul 15, 2027",
    url: "https://iccv.thecvf.com/"
  },
  {
    title: "VCIP 2026 – IEEE Visual Communications and Image Processing",
    month: "Dec", day: "13", year: "2026",
    location: "TBD",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Jun 15, 2026",
    notificationDate: "Sep 01, 2026",
    cameraReady: "Sep 25, 2026",
    url: "https://vcip2026.org/"
  },
  {
    title: "ICASSP 2027 – IEEE Intl. Conf. on Acoustics, Speech and Signal Processing",
    month: "Mar", day: "21", year: "2027",
    location: "New Orleans, USA",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Oct 20, 2026",
    notificationDate: "Jan 15, 2027",
    cameraReady: "Feb 05, 2027",
    url: "https://2027.ieeeicassp.org/"
  },

  // ── Health Informatics ─────────────────────────────────────

  {
    // Source: https://miccai.org/
    title: "MICCAI 2026 – International Conference on Medical Image Computing and Computer Assisted Intervention",
    month: "Oct", day: "4", year: "2026",
    location: "Abu Dhabi, UAE",
    topic: "Health Informatics",
    rank: "A",
    paperDeadline: "Feb 26, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://miccai.org/"
  },
  {
    // Source: https://biomedicalimaging.org/2026/
    title: "ISBI 2026 – IEEE International Symposium on Biomedical Imaging",
    month: "Apr", day: "8", year: "2026",
    location: "London, UK",
    topic: "Health Informatics",
    rank: "B",
    paperDeadline: "Oct 31, 2025",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://biomedicalimaging.org/2026/"
  },
  {
    title: "BIBM 2026 – IEEE International Conference on Bioinformatics and Biomedicine",
    month: "Dec", day: "01", year: "2026",
    location: "TBD",
    topic: "Health Informatics",
    rank: "B",
    paperDeadline: "Jul 05, 2026",
    notificationDate: "Sep 25, 2026",
    cameraReady: "Oct 25, 2026",
    url: "https://www3.cs.stonybrook.edu/~bibm2026/"
  },
  {
    title: "MICCAI 2027 – Medical Image Computing and Computer Assisted Intervention",
    month: "Sep", day: "27", year: "2027",
    location: "Auckland, New Zealand",
    topic: "Health Informatics",
    rank: "A",
    paperDeadline: "Feb 26, 2027",
    notificationDate: "Jun 15, 2027",
    cameraReady: "Jul 05, 2027",
    url: "https://miccai.org/"
  },
  {
    title: "IEEE ICDH 2026 – IEEE International Conference on Digital Health",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Health Informatics",
    rank: "",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/icdh"
  },
  {
    title: "HealthINF 2027 – International Conference on Health Informatics",
    month: "Feb", day: "22", year: "2027",
    location: "Porto, Portugal",
    topic: "Health Informatics",
    rank: "B",
    paperDeadline: "Oct 05, 2026",
    notificationDate: "Nov 30, 2026",
    cameraReady: "Dec 15, 2026",
    url: "https://healthinf.scitevents.org/"
  },
  {
    title: "AMIA 2027 – AMIA Annual Symposium",
    month: "Nov", day: "01", year: "2027",
    location: "TBD",
    topic: "Health Informatics",
    rank: "A",
    paperDeadline: "Mar 10, 2027",
    notificationDate: "Jun 15, 2027",
    cameraReady: "Jul 15, 2027",
    url: "https://amia.org/education-events/amia-2027-annual-symposium"
  },
  {
    title: "DH 2027 – ACM International Conference on Digital Health",
    month: "Jun", day: "15", year: "2027",
    location: "TBD",
    topic: "Health Informatics",
    rank: "B",
    paperDeadline: "Jan 15, 2027",
    notificationDate: "Mar 20, 2027",
    cameraReady: "Apr 10, 2027",
    url: "https://acmdh.org/"
  },

  // ── NLP ────────────────────────────────────────────────────

  {
    // Source: https://2026.aclweb.org/
    title: "ACL 2026 – Annual Meeting of the Association for Computational Linguistics",
    month: "Jul", day: "2", year: "2026",
    location: "San Diego, USA",
    topic: "NLP",
    rank: "A*",
    paperDeadline: "Jan 05, 2026",
    notificationDate: "Apr 04, 2026",
    cameraReady: "Apr 19, 2026",
    url: "https://2026.aclweb.org/"
  },
  {
    title: "EMNLP 2026 – Empirical Methods in Natural Language Processing",
    month: "Oct", day: "24", year: "2026",
    location: "Budapest, Hungary",
    topic: "NLP",
    rank: "A*",
    paperDeadline: "May 25, 2026",
    notificationDate: "Jul 30, 2026",
    cameraReady: "Aug 20, 2026",
    url: "https://2026.emnlp.org/"
  },
  {
    title: "ACL 2027 – Association for Computational Linguistics",
    month: "Jul", day: "10", year: "2027",
    location: "TBD",
    topic: "NLP",
    rank: "A*",
    paperDeadline: "Feb 16, 2027",
    notificationDate: "May 10, 2027",
    cameraReady: "May 30, 2027",
    url: "https://www.aclweb.org/"
  },

  // ── Data Mining & IR ───────────────────────────────────────

  {
    // Source: https://openreview.net/group?id=ACM.org/SIGIR/2026/Conference
    title: "SIGIR 2026 – ACM SIGIR Conference on Research and Development in Information Retrieval",
    month: "Jul", day: "20", year: "2026",
    location: "Melbourne, Australia",
    topic: "Data Mining & IR",
    rank: "A*",
    paperDeadline: "Jan 23, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://sigir2026.org/en-AU"
  },
  {
    // Source: https://kdd2026.kdd.org/research-track-call-for-papers/
    title: "KDD 2026 – ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
    month: "Aug", day: "9", year: "2026",
    location: "Jeju, South Korea",
    topic: "Data Mining & IR",
    rank: "A*",
    paperDeadline: "Feb 08, 2026",
    notificationDate: "May 16, 2026",
    cameraReady: "TBD",
    url: "https://kdd2026.kdd.org/"
  },
  {
    // Source: https://icde2026.github.io/important-dates.html
    title: "ICDE 2026 – IEEE International Conference on Data Engineering",
    month: "May", day: "4", year: "2026",
    location: "Montreal, Canada",
    topic: "Data Mining & IR",
    rank: "A*",
    paperDeadline: "Oct 27, 2025",
    notificationDate: "Feb 23, 2026",
    cameraReady: "Mar 06, 2026",
    url: "https://icde2026.github.io/"
  },
  {
    // Source: https://recsys.acm.org/recsys26/call/
    title: "RecSys 2026 – ACM Conference on Recommender Systems",
    month: "Sep", day: "28", year: "2026",
    location: "Minneapolis, USA",
    topic: "Data Mining & IR",
    rank: "A",
    paperDeadline: "Apr 21, 2026",
    notificationDate: "Jul 09, 2026",
    cameraReady: "Jul 27, 2026",
    url: "https://recsys.acm.org/recsys26/"
  },
  {
    // Source: https://er2026.org/dates.html
    title: "ER 2026 – International Conference on Conceptual Modeling",
    month: "Oct", day: "5", year: "2026",
    location: "St. John's, Canada",
    topic: "Data Mining & IR",
    rank: "A",
    paperDeadline: "May 12, 2026",
    notificationDate: "Jul 14, 2026",
    cameraReady: "Jul 28, 2026",
    url: "https://er2026.org/"
  },
  {
    title: "CIKM 2026 – Conference on Information and Knowledge Management",
    month: "Oct", day: "26", year: "2026",
    location: "Rome, Italy",
    topic: "Data Mining & IR",
    rank: "A",
    paperDeadline: "May 25, 2026",
    notificationDate: "Jul 31, 2026",
    cameraReady: "Aug 20, 2026",
    url: "https://cikm2026.diag.uniroma1.it/"
  },
  {
    title: "ICDM 2026 – IEEE International Conference on Data Mining",
    month: "Nov", day: "12", year: "2026",
    location: "Shenyang, China",
    topic: "Data Mining & IR",
    rank: "A*",
    paperDeadline: "Jun 06, 2026",
    notificationDate: "Aug 16, 2026",
    cameraReady: "Sep 15, 2026",
    url: "http://icdm2026.neu.edu.cn/"
  },
  {
    title: "KDD 2027 – Knowledge Discovery and Data Mining",
    month: "Aug", day: "03", year: "2027",
    location: "Toronto, Canada",
    topic: "Data Mining & IR",
    rank: "A*",
    paperDeadline: "Feb 08, 2027",
    notificationDate: "May 15, 2027",
    cameraReady: "Jun 10, 2027",
    url: "https://kdd.org/kdd2027/"
  },
  {
    title: "WSDM 2027 – ACM International Conference on Web Search and Data Mining",
    month: "Feb", day: "22", year: "2027",
    location: "TBD",
    topic: "Data Mining & IR",
    rank: "A",
    paperDeadline: "Aug 15, 2026",
    notificationDate: "Oct 25, 2026",
    cameraReady: "Nov 20, 2026",
    url: "https://www.wsdm-conference.org/2027/"
  },

  // ── Web & Networks ─────────────────────────────────────────

  {
    // Source: https://conferences.sigcomm.org/sigcomm/2026/
    title: "SIGCOMM 2026 – ACM Conference on Applications, Technologies, Protocols for Computer Communication",
    month: "Aug", day: "17", year: "2026",
    location: "Denver, USA",
    topic: "Web & Networks",
    rank: "A*",
    paperDeadline: "Feb 06, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://conferences.sigcomm.org/sigcomm/2026/"
  },
  {
    // Source: https://www2026.thewebconf.org/important-dates.html
    title: "TheWebConf 2026 – The Web Conference (WWW)",
    month: "Apr", day: "13", year: "2026",
    location: "Dubai, UAE",
    topic: "Web & Networks",
    rank: "A*",
    paperDeadline: "Oct 07, 2025",
    notificationDate: "Jan 13, 2026",
    cameraReady: "Jan 25, 2026",
    url: "https://www2026.thewebconf.org/"
  },
  {
    // Source: https://wsdm-conference.org/2026/
    title: "WSDM 2026 – ACM International Conference on Web Search and Data Mining",
    month: "Feb", day: "22", year: "2026",
    location: "Boise, USA",
    topic: "Web & Networks",
    rank: "A",
    paperDeadline: "Aug 14, 2025",
    notificationDate: "Oct 23, 2025",
    cameraReady: "TBD",
    url: "https://wsdm-conference.org/2026/"
  },
  {
    title: "TheWebConf 2027 (WWW) – The Web Conference",
    month: "Apr", day: "15", year: "2027",
    location: "TBD",
    topic: "Web & Networks",
    rank: "A*",
    paperDeadline: "Oct 15, 2026",
    notificationDate: "Jan 15, 2027",
    cameraReady: "Jan 30, 2027",
    url: "https://www2027.thewebconf.org/"
  },
  {
    title: "IEEE ICWS 2026 – IEEE International Conference on Web Services",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Web & Networks",
    rank: "B",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/icws/"
  },
  {
    title: "IEEE ICWS 2027 – IEEE International Conference on Web Services",
    month: "Jul", day: "12", year: "2027",
    location: "TBD",
    topic: "Web & Networks",
    rank: "B",
    paperDeadline: "Mar 08, 2027",
    notificationDate: "May 10, 2027",
    cameraReady: "May 31, 2027",
    url: "https://services.conferences.computer.org/2027/icws/"
  },
  {
    title: "IEEE SCC 2027 – IEEE International Conference on Services Computing",
    month: "Jul", day: "12", year: "2027",
    location: "TBD",
    topic: "Web & Networks",
    rank: "B",
    paperDeadline: "Mar 08, 2027",
    notificationDate: "May 10, 2027",
    cameraReady: "May 31, 2027",
    url: "https://services.conferences.computer.org/2027/scc/"
  },

  // ── Security ───────────────────────────────────────────────

  {
    // Source: https://www.sigsac.org/ccs/CCS2026/
    title: "CCS 2026 – ACM Conference on Computer and Communications Security",
    month: "Nov", day: "15", year: "2026",
    location: "The Hague, Netherlands",
    topic: "Security",
    rank: "A*",
    paperDeadline: "Apr 29, 2026",
    notificationDate: "Jul 17, 2026",
    cameraReady: "Sep 17, 2026",
    url: "https://www.sigsac.org/ccs/CCS2026/"
  },
  {
    title: "ESORICS 2026 – European Symposium on Research in Computer Security",
    month: "Sep", day: "14", year: "2026",
    location: "Rome, Italy",
    topic: "Security",
    rank: "A",
    paperDeadline: "Apr 21, 2026",
    notificationDate: "Jun 15, 2026",
    cameraReady: "Jul 10, 2026",
    url: "https://esorics2026.org/"
  },
  {
    title: "ACSAC 2026 – Annual Computer Security Applications Conference",
    month: "Dec", day: "07", year: "2026",
    location: "Los Angeles, USA",
    topic: "Security",
    rank: "B",
    paperDeadline: "May 26, 2026",
    notificationDate: "Aug 15, 2026",
    cameraReady: "Sep 20, 2026",
    url: "https://www.acsac.org/"
  },
  {
    title: "USENIX Security 2027 – 36th USENIX Security Symposium",
    month: "Aug", day: "11", year: "2027",
    location: "Denver, USA",
    topic: "Security",
    rank: "A*",
    paperDeadline: "Aug 25, 2026",
    notificationDate: "Nov 15, 2026",
    cameraReady: "Jan 10, 2027",
    url: "https://www.usenix.org/conference/usenixsecurity27"
  },

  // ── Software Engineering ───────────────────────────────────

  {
    // Source: https://conf.researchr.org/home/icse-2026
    title: "ICSE 2026 – International Conference on Software Engineering",
    month: "Apr", day: "12", year: "2026",
    location: "Rio de Janeiro, Brazil",
    topic: "Software Engineering",
    rank: "A*",
    paperDeadline: "Jul 19, 2025",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://conf.researchr.org/home/icse-2026"
  },
  {
    title: "IEEE SSE 2026 – IEEE International Conference on Software Services Engineering",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Software Engineering",
    rank: "",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/sse"
  },

  // ── Robotics ───────────────────────────────────────────────

  {
    // Source: https://2026.ieee-iros.org/
    title: "IROS 2026 – IEEE/RSJ International Conference on Intelligent Robots and Systems",
    month: "Sep", day: "27", year: "2026",
    location: "Pittsburgh, USA",
    topic: "Robotics",
    rank: "A",
    paperDeadline: "Mar 02, 2026",
    notificationDate: "Jun 16, 2026",
    cameraReady: "Jul 10, 2026",
    url: "https://2026.ieee-iros.org/"
  },
  {
    title: "CoRL 2026 – Conference on Robot Learning",
    month: "Nov", day: "05", year: "2026",
    location: "TBD",
    topic: "Robotics",
    rank: "B",
    paperDeadline: "May 28, 2026",
    notificationDate: "Aug 20, 2026",
    cameraReady: "Oct 12, 2026",
    url: "https://www.corl.org/"
  },
  {
    title: "ICRA 2027 – IEEE International Conference on Robotics and Automation",
    month: "May", day: "17", year: "2027",
    location: "TBD",
    topic: "Robotics",
    rank: "A*",
    paperDeadline: "Sep 15, 2026",
    notificationDate: "Jan 15, 2027",
    cameraReady: "Feb 25, 2027",
    url: "https://www.icra2027.org/"
  },

  // ── Cloud Computing ────────────────────────────────────────

  {
    title: "IEEE CLOUD 2026 – IEEE International Conference on Cloud Computing",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Cloud Computing",
    rank: "B",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/cloud"
  },
  {
    title: "IEEE EDGE 2026 – IEEE International Conference on Edge Computing",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Cloud Computing",
    rank: "",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/edge"
  },
  {
    title: "IEEE QSW 2026 – IEEE International Conference on Quantum Software",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Cloud Computing",
    rank: "",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/qsw"
  },
];
