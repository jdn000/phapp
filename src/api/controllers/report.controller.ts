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
    return await this.pdfService.test(alumnsData);


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
