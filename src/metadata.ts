/* eslint-disable */
export default async () => {
  const t = {
    ['./users/entities/user.entity']: await import(
      './users/entities/user.entity'
    ),
    ['./post/entities/post.entity']: await import(
      './post/entities/post.entity'
    ),
  };
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./users/dto/create-user.dto'),
          {
            CreateUserDto: {
              email: { required: true, type: () => String },
              fullname: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./users/dto/update-user.dto'),
          {
            UpdateUserDto: {
              fullname: { required: false, type: () => String },
              password: { required: false, type: () => String },
            },
          },
        ],
        [
          import('./post/entities/post.entity'),
          {
            Post: {
              id: { required: true, type: () => String },
              title: { required: true, type: () => String },
              slug: { required: true, type: () => String },
              content: { required: true, type: () => String },
              tags: { required: true, type: () => [String] },
              created_at: { required: true, type: () => Date },
              updated_at: { required: true, type: () => Date },
              user: {
                required: true,
                type: () => t['./users/entities/user.entity'].User,
              },
              userId: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./users/entities/user.entity'),
          {
            User: {
              id: { required: true, type: () => String },
              email: { required: true, type: () => String },
              fullname: { required: true, type: () => String },
              password: { required: true, type: () => String },
              role: { required: true, type: () => String },
              created_at: { required: true, type: () => Date },
              updated_at: { required: true, type: () => Date },
              posts: {
                required: true,
                type: () => [t['./post/entities/post.entity'].Post],
              },
            },
          },
        ],
        [
          import('./post/dto/create-post.dto'),
          {
            CreatePostDto: {
              title: { required: true, type: () => String },
              content: { required: true, type: () => String },
              tags: { required: false, type: () => [String] },
            },
          },
        ],
        [
          import('./post/dto/update-post.dto'),
          {
            UpdatePostDto: {
              title: { required: false, type: () => String },
              content: { required: false, type: () => String },
              tags: { required: false },
            },
          },
        ],
        [
          import('./auth/dto/auth.dto'),
          {
            AuthDto: {
              email: { required: true, type: () => String },
              password: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./users/users.controller'),
          {
            UsersController: {
              create: { type: Object },
              findAll: { type: Object },
              findOne: { type: Object },
              update: { type: Object },
              remove: { type: Object },
            },
          },
        ],
        [
          import('./post/post.controller'),
          {
            PostController: {
              create: { type: Object },
              findAll: { type: Object },
              findOne: { type: Object },
              update: { type: Object },
              remove: { type: Object },
            },
          },
        ],
        [
          import('./auth/auth.controller'),
          { AuthController: { login: { type: Object } } },
        ],
      ],
    },
  };
};
