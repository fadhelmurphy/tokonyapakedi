import React, { Suspense } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

function loadComponent(name: any) {
  name = name.split(":");
  if (name.length > 1) {
    name = name.join("");
  } else {
    name = name[0];
  }
  const Component = React.lazy(() => import(`../pages${name}`));
  return <Component />;
}

type RouterType = {
    url: string;
    exact: any;
}

export default function index() {
  const rootRouter: RouterType[] = [
    {
      url: "/",
      exact: true,
    },
    {
      url: "/collection",
      exact: true,
    },
    {
      url: "/collection/:name",
      exact: false,
    },
    {
      url: "/anime/:id",
      exact: false
    },
  ];
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={null}>
          <Switch>
            {rootRouter.map((el: any, idx: number) => (
              <Route
                key={idx}
                path={el.url}
                exact={el.exact || null}
                children={loadComponent(el.url)}
              />
            ))}
          </Switch>
        </Suspense>
      </BrowserRouter>
    </>
  );
}
