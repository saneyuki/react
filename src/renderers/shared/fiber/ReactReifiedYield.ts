/**
 * Copyright 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule ReactReifiedYield
 * @flow
 */

'use strict';

import { ReactYield } from './isomorphic/ReactCoroutine';
import { Fiber, createFiberFromElementType } from './ReactFiber';

export type ReifiedYield = { continuation: Fiber, props: Object };

export function createReifiedYield(yieldNode : ReactYield) : ReifiedYield {
  var fiber = createFiberFromElementType(
    yieldNode.continuation,
    yieldNode.key
  );
  return {
    continuation: fiber,
    props: yieldNode.props,
  };
}

export function createUpdatedReifiedYield(previousYield : ReifiedYield, yieldNode : ReactYield) : ReifiedYield {
  var fiber = previousYield.continuation;
  if (fiber.type !== yieldNode.continuation) {
    fiber = createFiberFromElementType(
      yieldNode.continuation,
      yieldNode.key
    );
  }
  return {
    continuation: fiber,
    props: yieldNode.props,
  };
}
