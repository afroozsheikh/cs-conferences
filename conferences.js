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
 *    topic: "Your Topic",       // e.g. Machine Learning, Computer Vision, Security, etc.
 *    rank: "A*",                // CORE ranking: "A*", "A", "B", "C", or "" if unknown
 *    paperDeadline: "Jan 15, 2026",
 *    notificationDate: "Mar 01, 2026",
 *    cameraReady: "Apr 05, 2026",
 *    url: "https://example.com"
 *  },
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

  // NeurIPS 2026: Confirmed Sydney, Australia, Dec 6-12, 2026
  // BUT call for papers / submission deadlines NOT yet announced.
  // Uncomment when deadlines are published.
  // {
  //   title: "NeurIPS 2026 – Conference on Neural Information Processing Systems",
  //   month: "Dec", day: "6", year: "2026",
  //   location: "Sydney, Australia",
  //   topic: "Machine Learning",
  //   rank: "A*",
  //   paperDeadline: "TBD",
  //   notificationDate: "TBD",
  //   cameraReady: "TBD",
  //   url: "https://neurips.cc/"
  // },

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
    // Source: https://iccv.thecvf.com/Conferences/2025/Dates
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

  // ── Pattern Recognition & Image Processing ─────────────────

  {
    // Source: https://icpr2026.org/dates.html
    title: "ICPR 2026 – International Conference on Pattern Recognition",
    month: "Aug", day: "17", year: "2026",
    location: "Lyon, France",
    topic: "Pattern Recognition",
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
    topic: "Image Processing",
    rank: "B",
    paperDeadline: "Feb 04, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://2026.ieeeicip.org/"
  },

  // ── Medical Imaging ────────────────────────────────────────

  {
    // Source: https://miccai.org/
    title: "MICCAI 2026 – International Conference on Medical Image Computing and Computer Assisted Intervention",
    month: "Oct", day: "4", year: "2026",
    location: "Abu Dhabi, UAE",
    topic: "Medical Imaging",
    rank: "A",
    paperDeadline: "Feb 26, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://miccai.org/"
  },
  {
    // Source: https://biomedicalimaging.org/2026/ & search results
    title: "ISBI 2026 – IEEE International Symposium on Biomedical Imaging",
    month: "Apr", day: "8", year: "2026",
    location: "London, UK",
    topic: "Medical Imaging",
    rank: "B",
    paperDeadline: "Oct 31, 2025",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://biomedicalimaging.org/2026/"
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

  // ── Networks ───────────────────────────────────────────────

  {
    // Source: https://conferences.sigcomm.org/sigcomm/2026/
    title: "SIGCOMM 2026 – ACM Conference on Applications, Technologies, Protocols for Computer Communication",
    month: "Aug", day: "17", year: "2026",
    location: "Denver, USA",
    topic: "Networks",
    rank: "A*",
    paperDeadline: "Feb 06, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://conferences.sigcomm.org/sigcomm/2026/"
  },

  // ── Software Engineering ───────────────────────────────────

  {
    // Source: https://conf.researchr.org/home/icse-2026 & hotcrp
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

  // ── Security ───────────────────────────────────────────────

  {
    // Source: https://www.sigsac.org/ccs/CCS2026/call-for/call-for-papers.html
    // Two submission cycles: Cycle 1 deadline Jan 14, Cycle 2 deadline Apr 29
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

  // ── Information Retrieval & Data Mining ─────────────────────

  {
    // Source: https://openreview.net/group?id=ACM.org/SIGIR/2026/Conference
    title: "SIGIR 2026 – ACM SIGIR Conference on Research and Development in Information Retrieval",
    month: "Jul", day: "20", year: "2026",
    location: "Melbourne, Australia",
    topic: "Information Retrieval",
    rank: "A*",
    paperDeadline: "Jan 23, 2026",
    notificationDate: "TBD",
    cameraReady: "TBD",
    url: "https://sigir2026.org/en-AU"
  },
  {
    // Source: https://kdd2026.kdd.org/research-track-call-for-papers/
    // Two cycles: Cycle 1 deadline Jul 31 2025, Cycle 2 deadline Feb 8 2026
    title: "KDD 2026 – ACM SIGKDD Conference on Knowledge Discovery and Data Mining",
    month: "Aug", day: "9", year: "2026",
    location: "Jeju, South Korea",
    topic: "Data Mining",
    rank: "A*",
    paperDeadline: "Feb 08, 2026",
    notificationDate: "May 16, 2026",
    cameraReady: "TBD",
    url: "https://kdd2026.kdd.org/"
  },

  // ── Conceptual Modeling ────────────────────────────────────

  {
    // Source: https://er2026.org/dates.html
    title: "ER 2026 – International Conference on Conceptual Modeling",
    month: "Oct", day: "5", year: "2026",
    location: "St. John's, Canada",
    topic: "Data & Knowledge Engineering",
    rank: "A",
    paperDeadline: "May 12, 2026",
    notificationDate: "Jul 14, 2026",
    cameraReady: "Jul 28, 2026",
    url: "https://er2026.org/"
  },

  // ── IEEE SERVICES (World Congress on Services) ─────────────
  // Source: https://services.conferences.computer.org/2026/info-for-authors/

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
    title: "IEEE ICDH 2026 – IEEE International Conference on Digital Health",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Digital Health",
    rank: "",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/icdh"
  },
  {
    title: "IEEE ICWS 2026 – IEEE International Conference on Web Services",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Web Services",
    rank: "B",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/icws/"
  },
  {
    title: "IEEE QSW 2026 – IEEE International Conference on Quantum Software",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Quantum Computing",
    rank: "",
    paperDeadline: "Mar 08, 2026",
    notificationDate: "May 10, 2026",
    cameraReady: "May 31, 2026",
    url: "https://services.conferences.computer.org/2026/qsw"
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
];
