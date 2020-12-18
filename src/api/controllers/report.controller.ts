import { JsonController, Param, Get, UseBefore, Res, Post } from 'routing-controllers';
import middlewares from '../middlewares';
//import { Grade } from '../../interfaces/Grade';
import PdfService from '../../services/pdf.service';
import AlumnService from '../../services/alumn.service';
import { celebrate } from 'celebrate';
import { Response } from 'express';
import { promisify } from 'util';
import ReportService from '../../services/report.service';

@JsonController('/report')
export class GradeController {

  constructor(private readonly pdfService: PdfService,
    private readonly reportService: ReportService,
    private readonly alumnService: AlumnService,
  ) { }

  @Post('/:gradeNumber')
  @UseBefore(middlewares.isAuth)
  async getAll(@Param('gradeNumber') gradeNumber: number): Promise<any> {
    const alumnsData = await this.alumnService.getallData(gradeNumber);
    return this.pdfService.test(alumnsData);
  }

  @Get('/:id/download')
  @UseBefore(middlewares.isAuth)
  // @UseBefore(celebrate(report.get))
  async downloadLabReport(@Param('id') id: number, @Res() response: Response): Promise<Response> {
    const { path } = await this.reportService.getById(id);
    await promisify<string, void>(response.download.bind(response))(path);
    this.reportService.deleteReportAfterDownload(path);
    return response;
  }

  @Get('/alumn/:id')
  @UseBefore(middlewares.isAuth)
  async getByAlumnId(@Param('id') id: number): Promise<any> {
    const alumnsData = await this.alumnService.getAlumnData(id);
    return this.pdfService.test([alumnsData]);
  }

}


/*
SELECT
    o.id,
    o.order_code AS "orderCode",
    o.patient_id AS "patientId",
    o.status AS "status",
    o.year AS "year",
    o.customer_center_id AS "customerCenterId",
    o.turn_id AS "turnId",
    o.to_bill AS "toBill",
    o.unplanned AS "unplanned",
    o.observation,
    o.user_id AS "userId",
    json_agg(DISTINCT  jsonb_strip_nulls( jsonb_build_object(
         'id',ot.id,
         'testId',tst.id,
         'registerDate', ot.register_date,
         'registerHour', ot.register_hour,
         'testStatus', ot.test_status,
         'testCode', tst.code,
         'testDescription', tst.description,
         'testAbbreviation', tst.abbreviation,
         'testIsMicro', tst.is_micro,
         'tubeId', otb.tube_id,
         'tubeLabeled', otb.labeled,
         'tubeExtractionDatetime',  otb.extraction_datetime,
         'tubeContainerLabel', otb.container_label,
         'tubeExtractionUser', otb.extraction_user,
         'tubeCode', tu.code,
         'tubeDescription', tu.description,
         'tubeBorderColor', tu.border_color ,
         'tubeCapColor', tu.cap_color ,
         'tubeSpecimenId', tu.specimen_Id
         ))) AS "tests",
        json_agg(DISTINCT  jsonb_strip_nulls( jsonb_build_object(
         'id',opr.id
         ))) AS "profiles",
         json_agg(DISTINCT  jsonb_strip_nulls( jsonb_build_object(
        'demographicId', dm.id,
        'itemId', dt.id ,
        'code',  dm.code ,
        'description',dm.description,
        'type',     dm.type,
        'use',      dm.use,
        'freeValue' ,    od.free_value ,
        'itemValue' ,  od.item_value
         ))) AS "demographics"
FROM ${schema~}.order o
LEFT JOIN ${schema~}.order_demographic od
ON o.id=od.order_id
LEFT JOIN ${schema~}.demographic_items dt
ON od.item_id=dt.id
LEFT JOIN ${schema~}.demographic dm
ON od.demographic_id=dm.id
LEFT JOIN ${schema~}.order_test ot
ON o.id=ot.order_id
LEFT JOIN ${schema~}.test tst
ON ot.test_id=tst.id
LEFT JOIN ${schema~}.order_tube otb
ON ot.id=otb.id
LEFT JOIN ${schema~}.order_profile opr
ON o.id=opr.order_id
LEFT JOIN ${schema~}.tube tu
ON otb.tube_id=tu.id
WHERE o.id = ANY(${ids})
GROUP BY o.id
*/