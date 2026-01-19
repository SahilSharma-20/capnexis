import { useState, useMemo } from "react";
import {
  Box,
  Tabs,
  Tab,
  Typography,
  Paper,
  Stack,
  Chip,
  Divider,
  LinearProgress,
  Select,
  MenuItem,
} from "@mui/material";

/* ======================================================
   HEADER
====================================================== */
const HEADER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab";

/* ======================================================
   MASTER DATA (FILTERABLE, MULTI-SIGNAL)
====================================================== */
const DATA = [
  {
    city: "Mumbai",
    project: "Tower A",
    vendor: "ABC Cement",

    delivery: 82,
    quantityAccuracy: 70,
    quality: 78,
    compliance: 70,

    strategic: {
      vision: 82,
      objectives: 78,
      stakeholders: 70,
      market: 74,
      resources: 80,
      communication: 76,
      review: 72,
    },

    risk: {
      financial: 68,
      regulatory: 74,
      operational: 62,
      market: 70,
      reputation: 76,
    },

    projectGov: {
      approval: 80,
      milestones: 72,
      budget: 70,
      escalation: 68,
      accountability: 66,
    },

    ethics: {
      standards: 88,
      traceability: 84,
      violations: 70,
      consistency: 76,
    },

    it: {
      alignment: 82,
      security: 78,
      data: 74,
      automation: 68,
    },

    transparency: {
      visibility: 80,
      traceability: 72,
      consistency: 76,
      accountability: 70,
    },

    discrepancies: [
      "Vendor reported 100% delivery, site verified 82%",
      "Quantity mismatch across GRNs",
      "Delayed daily progress reporting",
    ],
  },

  {
    city: "Pune",
    project: "Township",
    vendor: "FastTrack Logistics",

    delivery: 98,
    quantityAccuracy: 96,
    quality: 95,
    compliance: 96,

    strategic: {
      vision: 92,
      objectives: 90,
      stakeholders: 88,
      market: 90,
      resources: 94,
      communication: 92,
      review: 90,
    },

    risk: {
      financial: 90,
      regulatory: 92,
      operational: 88,
      market: 86,
      reputation: 94,
    },

    projectGov: {
      approval: 94,
      milestones: 92,
      budget: 90,
      escalation: 88,
      accountability: 90,
    },

    ethics: {
      standards: 96,
      traceability: 94,
      violations: 92,
      consistency: 94,
    },

    it: {
      alignment: 94,
      security: 92,
      data: 90,
      automation: 88,
    },

    transparency: {
      visibility: 94,
      traceability: 92,
      consistency: 94,
      accountability: 90,
    },

    discrepancies: [],
  },
];

/* ======================================================
   HELPERS
====================================================== */
const avgArr = (arr) =>
  Math.round(arr.reduce((a, b) => a + b, 0) / arr.length);

const avgObj = (obj) => avgArr(Object.values(obj));

const statusColor = (v) =>
  v >= 85 ? "success" : v >= 70 ? "warning" : "error";

/* ======================================================
   METRIC BLOCK (QUESTION + ANSWER)
====================================================== */
const MetricInsight = ({ label, value, insight }) => (
  <Paper sx={{ p: 2 }}>
    <Typography fontWeight={600}>{label}</Typography>
    <Typography variant="body2" color="text.secondary">
      {insight}
    </Typography>

    <Stack direction="row" spacing={2} alignItems="center" mt={1}>
      <Typography variant="h6">{value}%</Typography>
      <LinearProgress
        value={value}
        variant="determinate"
        color={statusColor(value)}
        sx={{ flex: 1, height: 6, borderRadius: 3 }}
      />
    </Stack>
  </Paper>
);

/* ======================================================
   STRATEGIC ALIGNMENT
====================================================== */
const StrategicAlignment = ({ d }) => {
  const score = avgObj(d.strategic);

  return (
    <>
      <Typography fontWeight={700} mb={2}>Strategic Alignment</Typography>

      <Stack spacing={2}>
        <MetricInsight
          label="Vision & Mission followed across projects"
          value={d.strategic.vision}
          insight="Vision adherence is strong in mature projects but weakens when stakeholder cadence drops."
        />
        <MetricInsight
          label="Clear project objectives defined"
          value={d.strategic.objectives}
          insight="Objectives are defined but not always translated into measurable execution targets."
        />
        <MetricInsight
          label="Stakeholder involvement in decisions"
          value={d.strategic.stakeholders}
          insight="Delayed stakeholder inputs are causing downstream execution misalignment."
        />
        <MetricInsight
          label="Leadership response to market changes"
          value={d.strategic.market}
          insight="Market signals are identified but response speed varies by city."
        />
        <MetricInsight
          label="Strategic resource allocation"
          value={d.strategic.resources}
          insight="Resources are sufficient but occasionally misallocated during peak execution phases."
        />
        <MetricInsight
          label="Leadership communication & monitoring"
          value={d.strategic.communication}
          insight="Monitoring exists but lacks standardized review rhythm."
        />
        <MetricInsight
          label="Periodic strategic review"
          value={d.strategic.review}
          insight="Strategic reviews are reactive rather than scheduled."
        />
      </Stack>

      <Divider sx={{ my: 2 }} />

      <Typography variant="caption">
        CXO Insight: {score < 80
          ? "Early strategic drift risk detected. Tighten leadership cadence."
          : "Projects broadly aligned with enterprise strategy."}
      </Typography>
    </>
  );
};

/* ======================================================
   ENTERPRISE RISK
====================================================== */
const EnterpriseRisk = ({ d }) => (
  <>
    <Typography fontWeight={700} mb={2}>Enterprise Risk Management</Typography>

    <Stack spacing={2}>
      <MetricInsight label="Financial risk" value={d.risk.financial}
        insight="Cost overruns correlate with delayed vendor deliveries." />
      <MetricInsight label="Regulatory risk" value={d.risk.regulatory}
        insight="Compliance exposure rises when documentation lags execution." />
      <MetricInsight label="Operational risk" value={d.risk.operational}
        insight="Execution delays driven by vendor dependency concentration." />
      <MetricInsight label="Market risk" value={d.risk.market}
        insight="Demand risk is moderate but pricing pressure is rising." />
      <MetricInsight label="Reputation risk" value={d.risk.reputation}
        insight="Customer disputes increase when transparency weakens." />
    </Stack>
  </>
);

/* ======================================================
   PROJECT GOVERNANCE
====================================================== */
const ProjectGovernance = ({ d }) => (
  <>
    <Typography fontWeight={700} mb={2}>Project Governance</Typography>

    <Stack spacing={2}>
      <MetricInsight label="Project approval discipline" value={d.projectGov.approval}
        insight="Approval framework exists but enforcement weakens during fast-track phases." />
      <MetricInsight label="Milestone adherence" value={d.projectGov.milestones}
        insight="Slippages cluster around vendor handoffs." />
      <MetricInsight label="Budget control" value={d.projectGov.budget}
        insight="Budget overruns emerge when escalation is delayed." />
      <MetricInsight label="Escalation clarity" value={d.projectGov.escalation}
        insight="Decision bottlenecks delay corrective actions." />
      <MetricInsight label="Accountability ownership" value={d.projectGov.accountability}
        insight="Ownership exists but consequences are inconsistent." />
    </Stack>
  </>
);

/* ======================================================
   ETHICS, IT, TRANSPARENCY (SAME PATTERN)
====================================================== */
const EthicsGovernance = ({ d }) => (
  <>
    <Typography fontWeight={700} mb={2}>Ethics & Compliance</Typography>
    <Stack spacing={2}>
      <MetricInsight label="Ethical standards enforcement" value={d.ethics.standards}
        insight="Policies exist but reporting confidence varies by site." />
      <MetricInsight label="Approval traceability" value={d.ethics.traceability}
        insight="Traceability gaps increase audit exposure." />
      <MetricInsight label="Violation reporting" value={d.ethics.violations}
        insight="Under-reporting observed in high-pressure projects." />
      <MetricInsight label="Consistency across locations" value={d.ethics.consistency}
        insight="Standards vary between cities." />
    </Stack>
  </>
);

const ITGovernance = ({ d }) => (
  <>
    <Typography fontWeight={700} mb={2}>IT Governance</Typography>
    <Stack spacing={2}>
      <MetricInsight label="IT alignment" value={d.it.alignment}
        insight="IT supports governance but automation gaps remain." />
      <MetricInsight label="Security & reliability" value={d.it.security}
        insight="Security posture is stable." />
      <MetricInsight label="Data protection" value={d.it.data}
        insight="Manual data handling increases risk." />
      <MetricInsight label="Process automation" value={d.it.automation}
        insight="Automation deficit directly increases governance leakage." />
    </Stack>
  </>
);

const TransparencyGovernance = ({ d }) => (
  <>
    <Typography fontWeight={700} mb={2}>Transparency & Accountability</Typography>
    <Stack spacing={2}>
      <MetricInsight label="Cross-project visibility" value={d.transparency.visibility}
        insight="Leadership visibility exists but is fragmented." />
      <MetricInsight label="Decision traceability" value={d.transparency.traceability}
        insight="Traceability weakens under execution pressure." />
      <MetricInsight label="Reporting consistency" value={d.transparency.consistency}
        insight="Reports vary by site." />
      <MetricInsight label="Accountability ownership" value={d.transparency.accountability}
        insight="Responsibility is defined but enforcement is uneven." />
    </Stack>
  </>
);
/* ======================================================
   CITY RISK HEATMAP (GRID + DRILL DOWN)
====================================================== */
const CityHeatmap = ({ dataset, onCitySelect }) => {
  const cities = [...new Set(dataset.map(d => d.city))];

  const cityScores = cities.map(city => {
    const cityData = dataset.filter(d => d.city === city);

    const riskScore = avgArr(cityData.flatMap(d => [
      avgObj(d.risk),
      avgObj(d.projectGov),
      d.delivery,
      d.quality,
      d.compliance,
    ]));

    return { city, riskScore };
  });

  const bg = (v) =>
    v >= 85 ? "#e8f5e9" :
    v >= 70 ? "#fff8e1" :
    "#ffebee";

  return (
    <>
      <Typography fontWeight={600} mb={1}>
        City Risk Heatmap
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap">
        {cityScores.map(c => (
          <Paper
            key={c.city}
            onClick={() => onCitySelect(c.city)}
            sx={{
              p: 2,
              minWidth: 160,
              cursor: "pointer",
              backgroundColor: bg(c.riskScore),
              transition: "all 0.2s ease",
              "&:hover": {
                boxShadow: 4,
                transform: "translateY(-2px)",
              },
            }}
          >
            <Typography fontWeight={600}>{c.city}</Typography>
            <Typography variant="h6">{c.riskScore}%</Typography>
            <Typography variant="caption">
              {c.riskScore >= 85
                ? "Healthy"
                : c.riskScore >= 70
                ? "Watch"
                : "High Risk"}
            </Typography>
          </Paper>
        ))}
      </Stack>
    </>
  );
};


/* ======================================================
   PREDICTIVE AI GOVERNANCE LAYER (WITH ACTIONS)
====================================================== */
const PredictiveAI = ({ data }) => {
  const vendorTrust = avgArr([
    data.delivery,
    data.quantityAccuracy,
    data.quality,
    data.compliance,
  ]);

  const executionRisk = avgObj(data.projectGov);
  const discrepancyCount = data.discrepancies.length;

  let outlook = "Stable";
  let narrative =
    "Current governance signals indicate stable execution with no immediate escalation risk.";

  let actions = ["Maintain current governance controls"];

  if (vendorTrust < 75 || discrepancyCount >= 2) {
    outlook = "High Risk (30–45 days)";
    narrative =
      "If current vendor reliability and discrepancy trends continue, execution delays, cost overruns, and compliance exposure are likely within the next 30–45 days.";
    actions = [
      "Initiate vendor performance audit",
      "Increase escalation cadence",
      "Freeze non-essential approvals",
    ];
  } else if (executionRisk < 75) {
    outlook = "Watch (45–60 days)";
    narrative =
      "Execution control weaknesses may translate into schedule slippage unless corrective governance action is taken.";
    actions = [
      "Tighten milestone monitoring",
      "Increase leadership review frequency",
    ];
  }

  return (
    <>
      <Typography fontWeight={600} mb={1}>
        Predictive AI Governance Outlook
      </Typography>

      <Paper sx={{ p: 2 }}>
        <Typography fontWeight={700}>{outlook}</Typography>

        <Typography variant="body2" mt={1}>
          {narrative}
        </Typography>

        <Divider sx={{ my: 1 }} />

        <Typography fontWeight={600}>Recommended Actions</Typography>
        {actions.map((a, i) => (
          <Typography key={i} variant="body2">
            • {a}
          </Typography>
        ))}

        <Divider sx={{ my: 1 }} />

        <Typography variant="caption">
          Signals used: Vendor trust trends, execution control strength,
          discrepancy frequency, and compliance stability.
        </Typography>
      </Paper>
    </>
  );
};


/* ======================================================
   TRUTH INDEX (ALL 7 FEATURES – SAFE)
====================================================== */
const TruthIndex = ({
  data,
  fullDataset = [],
  onCityDrill,
  onProjectDrill,
  onVendorDrill,
}) => {
  // 🛑 Safety guard
  if (!data) {
    return (
      <Typography color="text.secondary">
        No data available for selected filters.
      </Typography>
    );
  }

  const vendorTrust = avgArr([
    data.delivery,
    data.quantityAccuracy,
    data.quality,
    data.compliance,
  ]);

  const unifiedRisk = avgArr([
    avgObj(data.risk),
    avgObj(data.projectGov),
    data.delivery,
    data.quality,
    data.compliance,
  ]);

  const escalation =
    vendorTrust < 75 || data.discrepancies.length >= 2;

  const projectsInCity = fullDataset.filter(
    (d) => d.city === data.city
  );

  return (
    <>
      <Typography fontWeight={800} mb={2}>
        Truth Index™ — Unified Governance Reality
      </Typography>

      {/* Vendor Trust */}
      <MetricInsight
        label="Vendor Trust Index"
        value={vendorTrust}
        insight="Derived from delivery timeliness, quantity accuracy, and quality consistency."
      />

      {/* Unified Risk */}
      <MetricInsight
        label="Unified Risk Score"
        value={unifiedRisk}
        insight="Aggregated across execution, compliance, delivery, and quality signals."
      />

      <Divider sx={{ my: 3 }} />

      {/* City Heatmap */}
      <CityHeatmap
        dataset={fullDataset}
        onCitySelect={(city) => onCityDrill?.(city)}
      />

      <Divider sx={{ my: 3 }} />

      {/* Project Drill */}
      <Typography fontWeight={600}>
        Projects in {data.city}
      </Typography>

      <Stack direction="row" spacing={2} flexWrap="wrap" mt={1}>
        {projectsInCity.map((p, i) => (
          <Paper
            key={i}
            sx={{
              p: 2,
              minWidth: 200,
              cursor: "pointer",
              "&:hover": { boxShadow: 4 },
            }}
            onClick={() => onProjectDrill?.(p.project)}
          >
            <Typography fontWeight={600}>{p.project}</Typography>

            <Typography
              variant="body2"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
              onClick={(e) => {
                e.stopPropagation();
                onVendorDrill?.(p.vendor);
              }}
            >
              Vendor: {p.vendor}
            </Typography>

            <Typography variant="caption">
              Delivery: {p.delivery}%
            </Typography>
          </Paper>
        ))}
      </Stack>

      <Divider sx={{ my: 3 }} />

      {/* Predictive AI */}
      <PredictiveAI data={data} />

      <Divider sx={{ my: 3 }} />

      {/* Discrepancies */}
      <Typography fontWeight={600}>Discrepancies Detected</Typography>
      {data.discrepancies.length ? (
        data.discrepancies.map((x, i) => (
          <Chip
            key={i}
            label={x}
            color="error"
            sx={{ mr: 1, mt: 1 }}
          />
        ))
      ) : (
        <Chip label="No discrepancies detected" color="success" />
      )}

      {escalation && (
        <Chip
          label="Escalation Triggered"
          color="error"
          sx={{ mt: 2 }}
        />
      )}
    </>
  );
};

/* ======================================================
   MAIN PAGE
====================================================== */
export default function EnterpriseGovernance() {
  const [tab, setTab] = useState(0);
  const [city, setCity] = useState("All");
  const [project, setProject] = useState("All");

  const filtered = useMemo(
    () =>
      DATA.filter(
        (d) =>
          (city === "All" || d.city === city) &&
          (project === "All" || d.project === project)
      )[0] || DATA[0],
    [city, project]
  );

  return (
    <Box>
      <Box
        sx={{
          height: 260,
          backgroundImage: `url(${HEADER_IMAGE})`,
          backgroundSize: "cover",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
        }}
      >
        <Typography variant="h4" fontWeight={700}>
          Enterprise Level Governance
        </Typography>
      </Box>

      <Box sx={{ p: 3 }}>
        <Stack direction="row" spacing={2} mb={3}>
          <Select value={city} onChange={(e) => setCity(e.target.value)}>
            <MenuItem value="All">All Cities</MenuItem>
            {[...new Set(DATA.map(d => d.city))].map(c =>
              <MenuItem key={c} value={c}>{c}</MenuItem>
            )}
          </Select>

          <Select value={project} onChange={(e) => setProject(e.target.value)}>
            <MenuItem value="All">All Projects</MenuItem>
            {[...new Set(DATA.map(d => d.project))].map(p =>
              <MenuItem key={p} value={p}>{p}</MenuItem>
            )}
          </Select>
        </Stack>

        <Tabs value={tab} onChange={(e, v) => setTab(v)}>
          <Tab label="Strategic Alignment" />
          <Tab label="Enterprise Risk" />
          <Tab label="Project Governance" />
          <Tab label="Ethics" />
          <Tab label="IT" />
          <Tab label="Transparency" />
          <Tab label="Truth Index" />
        </Tabs>

        <Paper sx={{ p: 3, mt: 2 }}>
          {tab === 0 && <StrategicAlignment d={filtered} />}
          {tab === 1 && <EnterpriseRisk d={filtered} />}
          {tab === 2 && <ProjectGovernance d={filtered} />}
          {tab === 3 && <EthicsGovernance d={filtered} />}
          {tab === 4 && <ITGovernance d={filtered} />}
          {tab === 5 && <TransparencyGovernance d={filtered} />}
          {tab === 6 && (
  <TruthIndex
    data={filtered}
    fullDataset={DATA}
    onCityDrill={(city) => {
      setCity(city);
      setProject("All");
    }}
    onProjectDrill={(project) => setProject(project)}
    onVendorDrill={(vendor) => {
      console.log("Vendor drill:", vendor);
      // later: open vendor detail drawer
    }}
  />
)}

        </Paper>
      </Box>
    </Box>
  );
}
