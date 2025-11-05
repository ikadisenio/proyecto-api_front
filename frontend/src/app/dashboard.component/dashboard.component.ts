import { Component, NgZone, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';

am4core.useTheme(am4themes_animated);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: []
})
export class DashboardComponent implements OnInit {
  constructor(private http: HttpClient, private zone: NgZone) {}

  ngOnInit(): void {
    this.zone.runOutsideAngular(() => {
      this.loadChart();
      this.loadPieChart();
      this.loadFunnelChart();
      this.loadImageChart();
    });
  }

  loadChart(): void {
    this.http.get<any[]>('http://localhost:3000/api/ventas/top-productos').subscribe(data => {
      const chart = am4core.create('chartdiv', am4charts.XYChart);
      chart.fontSize = 10;
      chart.logo.disabled = true;

      chart.colors.list = [
        am4core.color('#5fa1e7ff'), // azul Bootstrap
        am4core.color('#9ae9acff'), // verde Bootstrap
        am4core.color('#d3be7fff'), // amarillo Bootstrap
        am4core.color('#7d89c2ff'), // rojo Bootstrap
        am4core.color('#7fe3f3ff'), // cian Bootstrap
        am4core.color('#c2acebff'), // púrpura
        am4core.color('#e6b790ff'), // naranja
        am4core.color('#faa0f4ff'), // naranja
        am4core.color('#c5f4ccff'), // naranja
        am4core.color('#828491ff'), // naranja
      ];


      chart.data = data.map(item => ({
        plan: item.plan_name,
        total: item.total
      }));

      const categoryAxis = chart.yAxes.push(new am4charts.CategoryAxis());
      categoryAxis.renderer.minGridDistance = 1;
      categoryAxis.dataFields.category = 'plan';
      categoryAxis.renderer.inversed = true;

      const valueAxis = chart.xAxes.push(new am4charts.ValueAxis());

      
      const series = chart.series.push(new am4charts.ColumnSeries());
      series.dataFields.valueX = 'total';
      series.dataFields.categoryY = 'plan';
      series.name = 'Total';
      series.columns.template.tooltipText = '{categoryY}: [bold]{valueX} planes';
      series.columns.template.fillOpacity = 0.8;
      series.columns.template.strokeOpacity = 0;
      series.columns.template.adapter.add('fill', (fill, target) => {
      if (target.dataItem) {
        return chart.colors.getIndex(target.dataItem.index);
      }
        return fill;
      });



      chart.cursor = new am4charts.XYCursor();
    });
  }


  loadPieChart(): void {
    this.http.get<any[]>('http://localhost:3000/api/ventas/top-tiendas').subscribe(data => {
    const chart = am4core.create('piechartdiv', am4charts.PieChart);
    chart.logo.disabled = true;
    chart.fontSize = 10;

    chart.data = data.map(item => ({
      tienda: item.store,
      total: item.total
    }));

    const pieSeries = chart.series.push(new am4charts.PieSeries());
    pieSeries.dataFields.value = 'total';
    pieSeries.dataFields.category = 'tienda';
    pieSeries.slices.template.strokeOpacity = 0;
    pieSeries.labels.template.text = '{category}: {value.percent.formatNumber("#.0")}%';
    pieSeries.ticks.template.disabled = true;
    pieSeries.labels.template.disabled = true;

    chart.legend = new am4charts.Legend();
    chart.legend.position = "right";
    // Colores variados
    pieSeries.slices.template.adapter.add('fill', (fill, target) => {
        if (target.dataItem) {
          return chart.colors.getIndex(target.dataItem.index);
        }
        return fill;
      });
    });
  }


  loadFunnelChart(): void {
    this.http.get<any[]>('http://localhost:3000/api/ventas/top-equipos').subscribe(data => {
      const chart = am4core.create('funneldatadiv', am4charts.SlicedChart);
      chart.logo.disabled = true;
      chart.fontSize = 9;

      chart.data = data.map(item => ({
        etapa: item.device,
        total: item.prom
      }));

      const series = chart.series.push(new am4charts.FunnelSeries());
      series.dataFields.value = 'total';
      series.dataFields.category = 'etapa';
      series.slices.template.tooltipText = '{category}: [bold]{value} registros';
      series.slices.template.strokeOpacity = 0;


      // Mostrar porcentaje en etiquetas
      series.labels.template.text = '{category}: {value.percent.formatNumber("#.0")}%';

    });
  }

  loadImageChart(): void {
  this.http.get<any[]>('http://localhost:3000/api/ventas/top-ejecutivos').subscribe(data => {
    const chart = am4core.create('imagechartdiv', am4charts.XYChart);
    chart.logo.disabled = true;
    chart.fontSize = 9;

    chart.data = data.map(item => ({
      nombre: item.user,
      total: item.total,
      imagen: `assets/img/${item.user.toLowerCase()}.png` // ajusta según tus nombres
    }));

    const categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
    categoryAxis.dataFields.category = 'nombre';
    categoryAxis.renderer.grid.template.location = 0;
    categoryAxis.renderer.labels.template.fontSize = 9;
    categoryAxis.renderer.minGridDistance = 1;
    //categoryAxis.renderer.labels.template.rotation = -45; 

    const valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    valueAxis.renderer.labels.template.fontSize = 12;

    const series = chart.series.push(new am4charts.ColumnSeries());
    series.dataFields.valueY = 'total';
    series.dataFields.categoryX = 'nombre';
    series.columns.template.tooltipText = '{categoryX}: [bold]{valueY} USD';
    series.columns.template.strokeOpacity = 0;
    series.columns.template.fillOpacity = 0.9;
    

  });
}



}
