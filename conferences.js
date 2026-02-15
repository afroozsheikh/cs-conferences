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
    title: "ICML 2026 – International Conference on Machine Learning",
    month: "Jul", day: "13", year: "2026",
    location: "Montreal, Canada",
    topic: "Machine Learning",
    rank: "A*",
    paperDeadline: "Feb 06, 2026",
    notificationDate: "Apr 01, 2026",
    cameraReady: "May 15, 2026",
    url: "https://icml.cc/"
  },
  {
    title: "NeurIPS 2026 – Conference on Neural Information Processing Systems",
    month: "Dec", day: "07", year: "2026",
    location: "San Diego, USA",
    topic: "Machine Learning",
    rank: "A*",
    paperDeadline: "May 15, 2026",
    notificationDate: "Sep 10, 2026",
    cameraReady: "Oct 20, 2026",
    url: "https://neurips.cc/"
  },

  // ── Computer Vision ────────────────────────────────────────

  {
    title: "CVPR 2026 – IEEE/CVF Conference on Computer Vision and Pattern Recognition",
    month: "Jun", day: "21", year: "2026",
    location: "Seattle, USA",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Mar 10, 2026",
    notificationDate: "Apr 25, 2026",
    cameraReady: "May 30, 2026",
    url: "https://cvpr.thecvf.com/"
  },
  {
    title: "ICCV 2026 – IEEE International Conference on Computer Vision",
    month: "Oct", day: "12", year: "2026",
    location: "TBD",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Mar 07, 2026",
    notificationDate: "Jun 15, 2026",
    cameraReady: "Aug 01, 2026",
    url: "https://iccv.thecvf.com/"
  },
  {
    title: "ECCV 2026 – European Conference on Computer Vision",
    month: "Sep", day: "28", year: "2026",
    location: "TBD",
    topic: "Computer Vision",
    rank: "A*",
    paperDeadline: "Mar 01, 2026",
    notificationDate: "Jun 01, 2026",
    cameraReady: "Jul 15, 2026",
    url: "https://eccv.ecva.net/"
  },
  {
    title: "WACV 2026 – IEEE Winter Conference on Applications of Computer Vision",
    month: "Feb", day: "28", year: "2026",
    location: "Tucson, USA",
    topic: "Computer Vision",
    rank: "B",
    paperDeadline: "Jul 15, 2025",
    notificationDate: "Oct 10, 2025",
    cameraReady: "Nov 15, 2025",
    url: "https://wacv2026.thecvf.com/"
  },
  {
    title: "BMVC 2026 – British Machine Vision Conference",
    month: "Nov", day: "24", year: "2026",
    location: "TBD",
    topic: "Computer Vision",
    rank: "A",
    paperDeadline: "May 02, 2026",
    notificationDate: "Aug 01, 2026",
    cameraReady: "Sep 15, 2026",
    url: "https://www.bmva.org/bmvc/"
  },

  // ── Pattern Recognition & Image Processing ─────────────────

  {
    title: "ICPR 2026 – International Conference on Pattern Recognition",
    month: "Sep", day: "14", year: "2026",
    location: "TBD",
    topic: "Pattern Recognition",
    rank: "B",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "Jun 01, 2026",
    cameraReady: "Jul 15, 2026",
    url: "https://www.icpr2026.org/"
  },
  {
    title: "ICIP 2026 – IEEE International Conference on Image Processing",
    month: "Oct", day: "19", year: "2026",
    location: "TBD",
    topic: "Image Processing",
    rank: "B",
    paperDeadline: "Feb 15, 2026",
    notificationDate: "May 15, 2026",
    cameraReady: "Jul 01, 2026",
    url: "https://2026.ieeeicip.org/"
  },

  // ── Medical Imaging ────────────────────────────────────────

  {
    title: "MICCAI 2026 – International Conference on Medical Image Computing and Computer Assisted Intervention",
    month: "Oct", day: "05", year: "2026",
    location: "TBD",
    topic: "Medical Imaging",
    rank: "A",
    paperDeadline: "Mar 01, 2026",
    notificationDate: "Jun 01, 2026",
    cameraReady: "Jul 15, 2026",
    url: "https://www.miccai.org/"
  },
  {
    title: "ISBI 2026 – IEEE International Symposium on Biomedical Imaging",
    month: "Apr", day: "13", year: "2026",
    location: "TBD",
    topic: "Medical Imaging",
    rank: "B",
    paperDeadline: "Nov 15, 2025",
    notificationDate: "Jan 15, 2026",
    cameraReady: "Feb 15, 2026",
    url: "https://biomedicalimaging.org/"
  },

  // ── NLP ────────────────────────────────────────────────────

  {
    title: "ACL 2026 – Annual Meeting of the Association for Computational Linguistics",
    month: "Aug", day: "02", year: "2026",
    location: "Sydney, Australia",
    topic: "NLP",
    rank: "A*",
    paperDeadline: "Apr 15, 2026",
    notificationDate: "Jun 10, 2026",
    cameraReady: "Jul 20, 2026",
    url: "https://www.2026.aclweb.org/"
  },

  // ── Networks ───────────────────────────────────────────────

  {
    title: "SIGCOMM 2026 – ACM Conference on Applications, Technologies, Protocols for Computer Communication",
    month: "Sep", day: "14", year: "2026",
    location: "London, UK",
    topic: "Networks",
    rank: "A*",
    paperDeadline: "Apr 22, 2026",
    notificationDate: "Jun 30, 2026",
    cameraReady: "Aug 10, 2026",
    url: "https://www.sigcomm.org/"
  },

  // ── Software Engineering ───────────────────────────────────

  {
    title: "ICSE 2026 – International Conference on Software Engineering",
    month: "May", day: "09", year: "2026",
    location: "Tokyo, Japan",
    topic: "Software Engineering",
    rank: "A*",
    paperDeadline: "Jan 20, 2026",
    notificationDate: "Mar 01, 2026",
    cameraReady: "Apr 05, 2026",
    url: "https://conf.researchr.org/home/icse-2026"
  },

  // ── Robotics ───────────────────────────────────────────────

  {
    title: "IROS 2026 – IEEE/RSJ International Conference on Intelligent Robots and Systems",
    month: "Oct", day: "26", year: "2026",
    location: "Dubai, UAE",
    topic: "Robotics",
    rank: "A",
    paperDeadline: "Jun 01, 2026",
    notificationDate: "Aug 01, 2026",
    cameraReady: "Sep 15, 2026",
    url: "https://ieee-iros.org/"
  },

  // ── Security ───────────────────────────────────────────────

  {
    title: "CCS 2026 – ACM Conference on Computer and Communications Security",
    month: "Nov", day: "10", year: "2026",
    location: "Singapore",
    topic: "Security",
    rank: "A*",
    paperDeadline: "May 20, 2026",
    notificationDate: "Jul 25, 2026",
    cameraReady: "Sep 05, 2026",
    url: "https://www.sigsac.org/ccs/CCS2026/"
  },

  // ── Conceptual Modeling ────────────────────────────────────

  {
    title: "ER 2026 – International Conference on Conceptual Modeling",
    month: "Oct", day: "05", year: "2026",
    location: "St. John's, Canada",
    topic: "Data & Knowledge Engineering",
    rank: "A",
    paperDeadline: "May 15, 2026",
    notificationDate: "Jul 15, 2026",
    cameraReady: "Aug 15, 2026",
    url: "https://er2026.org/"
  },

  // ── IEEE SERVICES (World Congress on Services) ─────────────

  {
    title: "IEEE CLOUD 2026 – IEEE International Conference on Cloud Computing",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Cloud Computing",
    rank: "B",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "May 01, 2026",
    cameraReady: "Jun 01, 2026",
    url: "https://services.conferences.computer.org/2026/cloud"
  },
  {
    title: "IEEE EDGE 2026 – IEEE International Conference on Edge Computing",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Cloud Computing",
    rank: "",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "May 01, 2026",
    cameraReady: "Jun 01, 2026",
    url: "https://services.conferences.computer.org/2026/edge"
  },
  {
    title: "IEEE ICDH 2026 – IEEE International Conference on Digital Health",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Digital Health",
    rank: "",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "May 01, 2026",
    cameraReady: "Jun 01, 2026",
    url: "https://services.conferences.computer.org/2026/icdh"
  },
  {
    title: "IEEE ICWS 2026 – IEEE International Conference on Web Services",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Web Services",
    rank: "B",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "May 01, 2026",
    cameraReady: "Jun 01, 2026",
    url: "https://services.conferences.computer.org/2026/icws/"
  },
  {
    title: "IEEE QSW 2026 – IEEE International Conference on Quantum Software",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Quantum Computing",
    rank: "",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "May 01, 2026",
    cameraReady: "Jun 01, 2026",
    url: "https://services.conferences.computer.org/2026/qsw"
  },
  {
    title: "IEEE SSE 2026 – IEEE International Conference on Software Services Engineering",
    month: "Jul", day: "13", year: "2026",
    location: "Sydney, Australia",
    topic: "Software Engineering",
    rank: "",
    paperDeadline: "Mar 15, 2026",
    notificationDate: "May 01, 2026",
    cameraReady: "Jun 01, 2026",
    url: "https://services.conferences.computer.org/2026/sse"
  },
];
