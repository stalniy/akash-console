import { createRoute, OpenAPIHono, z } from "@hono/zod-openapi";

import { cacheKeys, cacheResponse } from "@src/caching/helpers";
import { getCachedTemplatesGallery, getTemplateGallery } from "@src/services/external/templateReposService";

const route = createRoute({
  method: "get",
  path: "/templates",
  tags: ["Other"],
  responses: {
    200: {
      description: "Returns a list of deployment templates grouped by categories",
      content: {
        "application/json": {
          schema: z.array(
            z.object({
              title: z.string(),
              templates: z.array(
                z.object({
                  id: z.string(),
                  name: z.string(),
                  logoUrl: z.string().nullable(),
                  summary: z.string(),
                })
              )
            })
          )
        }
      }
    }
  }
});

export default new OpenAPIHono().openapi(route, async c => {
  const response = await getCachedTemplatesGallery();
  return c.json(response);
});
//asdasdasdasd
