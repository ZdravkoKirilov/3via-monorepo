import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UsePipes,
} from '@nestjs/common';

import { AppUrls, QuestionEntity, UrlParams } from '@3via/core';
import { QuestionsService } from './questions.service';
import { IDParamPipe, ZodValidationPipe } from '../shared';

@Controller()
export class QuestionsController {
  constructor(private readonly questionService: QuestionsService) {}

  @Get(AppUrls.questions)
  async getQuestions() {
    return this.questionService.getQuestions();
  }

  @Post(AppUrls.questions)
  @UsePipes(new ZodValidationPipe(QuestionEntity.createQuestionDtoParser))
  async createQuestion(@Body() dto: QuestionEntity.CreateQuestionDto) {
    return this.questionService.createQuestion(dto);
  }

  @Put(AppUrls.questions)
  @UsePipes(new ZodValidationPipe(QuestionEntity.questionsParser))
  async updateQuestions(@Body() dto: QuestionEntity.Question[]) {
    return this.questionService.saveQuestions(dto);
  }

  @Put(AppUrls.question)
  @UsePipes(new ZodValidationPipe(QuestionEntity.questionsParser))
  async updateQuestion(@Body() dto: QuestionEntity.Question) {
    return this.questionService.updateQuestion(dto);
  }

  @Delete(AppUrls.question)
  async deleteQuestion(
    @Param(UrlParams.QuestionId, IDParamPipe)
    questionId: QuestionEntity.Question['id']
  ) {
    return this.questionService.deleteQuestion(questionId);
  }
}
