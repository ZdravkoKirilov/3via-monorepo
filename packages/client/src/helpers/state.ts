import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { httpApi } from './http-api';
import { QuestionEntity } from '@3via/core';

const cacheKey = ['questions'];

export const useQuestions = () => {
  const client = useQueryClient();

  const query = useQuery(cacheKey, httpApi.getQuestions, {
    refetchOnWindowFocus: false,
  });

  const existingQuestions =
    client.getQueryData<QuestionEntity.Question[]>(cacheKey) || [];

  const addQuestion = useMutation(httpApi.addQuestion, {
    onSuccess: (response) => {
      client.setQueryData(cacheKey, [
        ...existingQuestions.filter((elem) => elem.id !== response.id),
        response,
      ]);
    },
  });

  const editQuestion = useMutation(httpApi.editQuestion, {
    onSuccess: (response) => {
      client.setQueryData(
        cacheKey,
        existingQuestions.map((question) =>
          question.id === response.id ? response : question
        )
      );
    },
  });

  const deleteQuestion = useMutation(httpApi.deleteQuestion, {
    onSuccess: () => {
      client.setQueryData(
        cacheKey,
        existingQuestions.filter(
          (question) => question.id !== deleteQuestion.variables
        )
      );
    },
  });

  const saveQuestions = useMutation(httpApi.saveQuestions, {
    /* the operation is suitable for an optimistic update */
    onMutate: async (newQuestions) => {
      await client.cancelQueries(cacheKey);

      const previousData = client.getQueryData(cacheKey);

      client.setQueryData(cacheKey, newQuestions);

      return { revert: () => client.setQueryData(cacheKey, previousData) };
    },
    onError: (_err, _data, context) => {
      context?.revert();
    },
    onSuccess: () => {
      query.refetch();
    },
  });

  return { query, addQuestion, deleteQuestion, editQuestion, saveQuestions };
};
