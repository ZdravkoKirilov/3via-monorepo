import { z } from 'zod';
import { uuid } from 'uuidv4';

const createAnswerDtoParser = z.object({
  title: z.string(),
  points: z.number(),
});

export type CreateAnswerDto = z.infer<typeof createAnswerDtoParser>;

const answerParser = createAnswerDtoParser.merge(
  z.object({
    id: z.string(),
  })
);

export type Answer = z.infer<typeof answerParser>;

const create = (dto: CreateAnswerDto, id = uuid()): Answer => ({
  id,
  ...dto,
});

export { create, answerParser };
