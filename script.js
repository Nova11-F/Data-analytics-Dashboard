const state = {
  data: [],
  filters: {
    region: "All",
    category: "All",
    customerType: "All",
    channel: "All",
  },
};

const chartInstances = {};
const palette = [
  "#22d3ee",
  "#818cf8",
  "#f59e0b",
  "#34d399",
  "#f472b6",
  "#fb923c",
  "#60a5fa",
  "#a78bfa",
];

window.addEventListener("DOMContentLoaded", () => {
  initTheme();
  bindEvents();
  loadData();
});

window.addEventListener("resize", () => {
  Object.values(chartInstances).forEach((chart) => chart.resize());
});

function bindEvents() {
  [
    "regionFilter",
    "categoryFilter",
    "customerTypeFilter",
    "channelFilter",
  ].forEach((id) => {
    document.getElementById(id).addEventListener("change", handleFilterChange);
  });

  document.getElementById("themeToggle").addEventListener("click", () => {
    const nextTheme = document.body.classList.contains("theme-light")
      ? "dark"
      : "light";
    applyTheme(nextTheme);
    render();
  });

  document.getElementById("resetFilters").addEventListener("click", () => {
    state.filters = {
      region: "All",
      category: "All",
      customerType: "All",
      channel: "All",
    };
    [
      "regionFilter",
      "categoryFilter",
      "customerTypeFilter",
      "channelFilter",
    ].forEach((id) => {
      document.getElementById(id).value = "All";
    });
    render();
  });
}

async function loadData() {
  try {
    const response = await fetch("200_sales_data.csv");
    if (!response.ok) {
      throw new Error("Unable to read sales data file.");
    }

    const csvText = await response.text();
    state.data = parseCsv(csvText);
    populateFilters();
    render();
  } catch (error) {
    console.error(error);
    document.getElementById("kpiGrid").innerHTML = `
      <div class="col-span-full rounded-3xl border border-red-500/30 bg-red-500/10 p-6 text-center text-red-200">
        Could not load the CSV file. Make sure the dashboard is served via a local web server.
      </div>
    `;
  }
}

function handleFilterChange(event) {
  const { id, value } = event.target;
  const mapping = {
    regionFilter: "region",
    categoryFilter: "category",
    customerTypeFilter: "customerType",
    channelFilter: "channel",
  };

  state.filters[mapping[id]] = value;
  render();
}

function parseCsv(text) {
  const rows = [];
  const lines = text.trim().split(/\r?\n/);
  const headers = lines[0].split(",").map((header) => header.trim());

  for (let i = 1; i < lines.length; i += 1) {
    if (!lines[i].trim()) continue;

    const values = parseCsvLine(lines[i]);
    const record = {};

    headers.forEach((header, index) => {
      record[header] = values[index] ? values[index].trim() : "";
    });

    record.Sales_Amount = parseFloat(record.Sales_Amount) || 0;
    record.Quantity_Sold = parseInt(record.Quantity_Sold, 10) || 0;
    record.Discount = parseFloat(record.Discount) || 0;

    rows.push(record);
  }

  return rows;
}

function parseCsvLine(line) {
  const values = [];
  let current = "";
  let insideQuotes = false;

  for (let i = 0; i < line.length; i += 1) {
    const char = line[i];

    if (char === '"') {
      insideQuotes = !insideQuotes;
    } else if (char === "," && !insideQuotes) {
      values.push(current);
      current = "";
    } else {
      current += char;
    }
  }

  values.push(current);
  return values;
}

function populateFilters() {
  const uniqueValues = (key) => {
    return [
      "All",
      ...new Set(state.data.map((item) => item[key]).filter(Boolean)),
    ].sort((a, b) => a.localeCompare(b));
  };

  fillSelect("regionFilter", uniqueValues("Region"));
  fillSelect("categoryFilter", uniqueValues("Product_Category"));
  fillSelect("customerTypeFilter", uniqueValues("Customer_Type"));
  fillSelect("channelFilter", uniqueValues("Sales_Channel"));
}

function fillSelect(id, values) {
  const select = document.getElementById(id);
  const mapping = {
    regionFilter: "region",
    categoryFilter: "category",
    customerTypeFilter: "customerType",
    channelFilter: "channel",
  };

  select.innerHTML = values
    .map((value) => `<option value="${value}">${value}</option>`)
    .join("");

  const currentValue = state.filters[mapping[id]];
  if (currentValue) {
    select.value = currentValue;
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem("salesDashboardTheme");
  const preferredTheme = savedTheme === "light" ? "light" : "dark";
  applyTheme(preferredTheme);
}

function applyTheme(theme) {
  const isLight = theme === "light";
  document.body.classList.remove("theme-light", "theme-dark");
  document.body.classList.add(isLight ? "theme-light" : "theme-dark");
  localStorage.setItem("salesDashboardTheme", theme);

  const toggle = document.getElementById("themeToggle");
  if (toggle) {
    toggle.setAttribute("aria-pressed", String(isLight));
    const icon = toggle.querySelector(".theme-icon");
    const label = toggle.querySelector(".theme-label");
    if (icon) icon.textContent = isLight ? "☀️" : "🌙";
    if (label) label.textContent = isLight ? "Light Mode" : "Dark Mode";
  }
}

function render() {
  const filteredData = getFilteredData();
  renderKpis(filteredData);
  renderCharts(filteredData);
  renderTopSales(filteredData);
}

function getFilteredData() {
  return state.data.filter((row) => {
    const matchesRegion =
      state.filters.region === "All" || row.Region === state.filters.region;
    const matchesCategory =
      state.filters.category === "All" ||
      row.Product_Category === state.filters.category;
    const matchesCustomer =
      state.filters.customerType === "All" ||
      row.Customer_Type === state.filters.customerType;
    const matchesChannel =
      state.filters.channel === "All" ||
      row.Sales_Channel === state.filters.channel;

    return (
      matchesRegion && matchesCategory && matchesCustomer && matchesChannel
    );
  });
}

function createKpiCard(title, value, accent) {
  return `
    <article class="theme-surface stat-card rounded-3xl border p-4 shadow-xl backdrop-blur transition hover:-translate-y-1">
      <p class="theme-text-muted kpi-title text-sm font-medium">${title}</p>
      <p class="theme-text-primary kpi-value mt-2 text-2xl font-semibold">${value}</p>
      <div class="theme-surface-strong mt-3 h-1.5 rounded-full">
        <div class="h-1.5 rounded-full" style="width: 75%; background: ${accent};"></div>
      </div>
    </article>
  `;
}

function renderKpis(rows) {
  const totalRevenue = rows.reduce((sum, row) => sum + row.Sales_Amount, 0);
  const totalTransactions = rows.length;
  const totalQuantity = rows.reduce((sum, row) => sum + row.Quantity_Sold, 0);
  const averageDiscount = rows.length
    ? rows.reduce((sum, row) => sum + row.Discount, 0) / rows.length
    : 0;

  document.getElementById("kpiGrid").innerHTML = [
    createKpiCard("Total Revenue", formatCurrency(totalRevenue), "#22d3ee"),
    createKpiCard(
      "Total Transactions",
      totalTransactions.toLocaleString(),
      "#818cf8",
    ),
    createKpiCard(
      "Total Quantity Sold",
      totalQuantity.toLocaleString(),
      "#34d399",
    ),
    createKpiCard(
      "Average Discount",
      `${(averageDiscount * 100).toFixed(2)}%`,
      "#f59e0b",
    ),
  ].join("");
}

function renderCharts(rows) {
  destroyCharts();
  updateChartTheme();

  renderLineChart("salesTrendChart", buildMonthlySeries(rows), "Sales Trend");
  renderBarChart(
    "regionChart",
    buildGroupedSeries(rows, "Region"),
    "Revenue by Region",
  );
  renderBarChart(
    "categoryChart",
    buildGroupedSeries(rows, "Product_Category"),
    "Revenue by Category",
  );
  renderBarChart(
    "repChart",
    buildGroupedSeries(rows, "Sales_Rep"),
    "Revenue by Sales Rep",
  );
  renderDoughnutChart(
    "customerChart",
    buildCountSeries(rows, "Customer_Type"),
    "Customer Types",
  );
  renderDoughnutChart(
    "paymentChart",
    buildCountSeries(rows, "Payment_Method"),
    "Payment Methods",
  );
  renderDoughnutChart(
    "channelChart",
    buildCountSeries(rows, "Sales_Channel"),
    "Sales Channels",
  );
  renderScatterChart("discountScatterChart", rows);
  renderBarChart(
    "quantityCategoryChart",
    buildQuantitySeries(rows, "Product_Category"),
    "Quantity Sold by Category",
  );
}

function destroyCharts() {
  Object.values(chartInstances).forEach((chart) => chart.destroy());
  Object.keys(chartInstances).forEach((key) => delete chartInstances[key]);
}

function buildMonthlySeries(rows) {
  const monthly = {};

  rows.forEach((row) => {
    const date = new Date(row.Sale_Date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    monthly[key] = (monthly[key] || 0) + row.Sales_Amount;
  });

  const labels = Object.keys(monthly).sort();
  return {
    labels: labels.map((key) => formatMonth(key)),
    values: labels.map((key) => monthly[key]),
  };
}

function buildGroupedSeries(rows, key) {
  const grouped = {};

  rows.forEach((row) => {
    const label = row[key] || "Unknown";
    grouped[label] = (grouped[label] || 0) + row.Sales_Amount;
  });

  const labels = Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]);
  return { labels, values: labels.map((label) => grouped[label]) };
}

function buildCountSeries(rows, key) {
  const grouped = {};

  rows.forEach((row) => {
    const label = row[key] || "Unknown";
    grouped[label] = (grouped[label] || 0) + 1;
  });

  const labels = Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]);
  return { labels, values: labels.map((label) => grouped[label]) };
}

function buildQuantitySeries(rows, key) {
  const grouped = {};

  rows.forEach((row) => {
    const label = row[key] || "Unknown";
    grouped[label] = (grouped[label] || 0) + row.Quantity_Sold;
  });

  const labels = Object.keys(grouped).sort((a, b) => grouped[b] - grouped[a]);
  return { labels, values: labels.map((label) => grouped[label]) };
}

function renderLineChart(canvasId, series, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  chartInstances[canvasId] = new Chart(ctx, {
    type: "line",
    data: {
      labels: series.labels,
      datasets: [
        {
          label: title,
          data: series.values,
          borderColor: "#22d3ee",
          backgroundColor: "rgba(34, 211, 238, 0.16)",
          fill: true,
          tension: 0.35,
          pointRadius: 3,
          pointHoverRadius: 5,
        },
      ],
    },
    options: getChartOptions(),
  });
}

function renderBarChart(canvasId, series, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  chartInstances[canvasId] = new Chart(ctx, {
    type: "bar",
    data: {
      labels: series.labels,
      datasets: [
        {
          label: title,
          data: series.values,
          backgroundColor: series.labels.map(
            (_, index) => palette[index % palette.length],
          ),
          borderRadius: 8,
        },
      ],
    },
    options: getChartOptions(),
  });
}

function renderDoughnutChart(canvasId, series, title) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  chartInstances[canvasId] = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: series.labels,
      datasets: [
        {
          label: title,
          data: series.values,
          backgroundColor: series.labels.map(
            (_, index) => palette[index % palette.length],
          ),
        },
      ],
    },
    options: getChartOptions(),
  });
}

function renderScatterChart(canvasId, rows) {
  const canvas = document.getElementById(canvasId);
  if (!canvas) return;

  const isLight = document.body.classList.contains("theme-light");
  const textColor = isLight ? "#0f172a" : "#f8fafc";
  const mutedColor = isLight ? "#475569" : "#cbd5e1";
  const gridColor = isLight
    ? "rgba(15, 23, 42, 0.16)"
    : "rgba(148, 163, 184, 0.2)";
  const data = rows.map((row) => ({
    x: row.Discount * 100,
    y: row.Sales_Amount,
  }));
  const ctx = canvas.getContext("2d");
  chartInstances[canvasId] = new Chart(ctx, {
    type: "scatter",
    data: {
      datasets: [
        {
          label: "Discount vs Sales",
          data,
          backgroundColor: "#22d3ee",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { labels: { color: textColor } },
      },
      scales: {
        x: {
          title: { display: true, text: "Discount (%)", color: textColor },
          ticks: { color: mutedColor },
          grid: { color: gridColor },
        },
        y: {
          title: { display: true, text: "Sales Amount", color: textColor },
          ticks: { color: mutedColor },
          grid: { color: gridColor },
        },
      },
    },
  });
}

function updateChartTheme() {
  const isLight = document.body.classList.contains("theme-light");
  const textColor = isLight ? "#0f172a" : "#f8fafc";
  const mutedColor = isLight ? "#475569" : "#cbd5e1";
  const gridColor = isLight
    ? "rgba(15, 23, 42, 0.16)"
    : "rgba(148, 163, 184, 0.2)";
  const tooltipBg = isLight ? "#ffffff" : "#0f172a";

  Chart.defaults.color = textColor;
  Chart.defaults.borderColor = isLight
    ? "rgba(15, 23, 42, 0.12)"
    : "rgba(226, 232, 240, 0.25)";

  Chart.defaults.plugins = Chart.defaults.plugins || {};
  Chart.defaults.plugins.tooltip = Chart.defaults.plugins.tooltip || {};
  Chart.defaults.plugins.tooltip.backgroundColor = tooltipBg;
  Chart.defaults.plugins.tooltip.titleColor = textColor;
  Chart.defaults.plugins.tooltip.bodyColor = mutedColor;

  Chart.defaults.plugins.legend = Chart.defaults.plugins.legend || {};
  Chart.defaults.plugins.legend.labels =
    Chart.defaults.plugins.legend.labels || {};
  Chart.defaults.plugins.legend.labels.color = textColor;

  Chart.defaults.scales = Chart.defaults.scales || {};
  Chart.defaults.scales.category = Chart.defaults.scales.category || {};
  Chart.defaults.scales.category.ticks =
    Chart.defaults.scales.category.ticks || {};
  Chart.defaults.scales.category.grid =
    Chart.defaults.scales.category.grid || {};
  Chart.defaults.scales.category.ticks.color = mutedColor;
  Chart.defaults.scales.category.grid.color = gridColor;

  Chart.defaults.scales.linear = Chart.defaults.scales.linear || {};
  Chart.defaults.scales.linear.ticks = Chart.defaults.scales.linear.ticks || {};
  Chart.defaults.scales.linear.grid = Chart.defaults.scales.linear.grid || {};
  Chart.defaults.scales.linear.ticks.color = mutedColor;
  Chart.defaults.scales.linear.grid.color = gridColor;
}

function getChartOptions() {
  const isLight = document.body.classList.contains("theme-light");
  const textColor = isLight ? "#0f172a" : "#f8fafc";
  const mutedColor = isLight ? "#475569" : "#cbd5e1";
  const gridColor = isLight
    ? "rgba(15, 23, 42, 0.16)"
    : "rgba(148, 163, 184, 0.2)";

  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        labels: { color: textColor },
      },
    },
    scales: {
      x: {
        ticks: { color: mutedColor },
        grid: { color: gridColor },
      },
      y: {
        ticks: { color: mutedColor },
        grid: { color: gridColor },
      },
    },
  };
}

function renderTopSales(rows) {
  const sorted = [...rows]
    .sort((a, b) => b.Sales_Amount - a.Sales_Amount)
    .slice(0, 10);
  const tableBody = document.getElementById("topSalesTable");

  if (!tableBody) return;

  tableBody.innerHTML = sorted.length
    ? sorted
        .map(
          (row, index) => `
            <tr class="theme-text-secondary">
              <td class="px-2 py-2">${index + 1}</td>
              <td class="px-2 py-2">${row.Sales_Rep}</td>
              <td class="px-2 py-2">${row.Region}</td>
              <td class="px-2 py-2">${formatCurrency(row.Sales_Amount)}</td>
            </tr>
          `,
        )
        .join("")
    : '<tr><td colspan="4" class="theme-text-muted px-2 py-4 text-center">No sales match the selected filters.</td></tr>';
}

function formatCurrency(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

function formatMonth(key) {
  const [year, month] = key.split("-");
  const date = new Date(`${year}-${month}-01`);
  return date.toLocaleString("en-US", { month: "short", year: "numeric" });
}
