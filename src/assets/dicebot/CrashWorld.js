/* Generated by Opal 1.0.3 */
(function(Opal) {
  function $rb_le(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs <= rhs : lhs['$<='](rhs);
  }
  function $rb_plus(lhs, rhs) {
    return (typeof(lhs) === 'number' && typeof(rhs) === 'number') ? lhs + rhs : lhs['$+'](rhs);
  }
  var self = Opal.top, $nesting = [], nil = Opal.nil, $$$ = Opal.const_get_qualified, $$ = Opal.const_get_relative, $breaker = Opal.breaker, $slice = Opal.slice, $klass = Opal.klass, $truthy = Opal.truthy;

  Opal.add_stubs(['$setPrefixes', '$===', '$getCrashWorldRoll', '$to_i', '$last_match', '$debug', '$!', '$roll', '$==', '$<=', '$+']);
  return (function($base, $super, $parent_nesting) {
    var self = $klass($base, $super, 'CrashWorld');

    var $nesting = [self].concat($parent_nesting), $CrashWorld_rollDiceCommand$1, $CrashWorld_getCrashWorldRoll$2;

    
    Opal.const_set($nesting[0], 'ID', "CrashWorld");
    Opal.const_set($nesting[0], 'NAME', "墜落世界");
    Opal.const_set($nesting[0], 'SORT_KEY', "ついらくせかい");
    Opal.const_set($nesting[0], 'HELP_MESSAGE', "" + "・判定 CWn\n" + "初期目標値n (必須)\n" + "例・CW8\n");
    self.$setPrefixes(["CW\\d+"]);
    
    Opal.def(self, '$rollDiceCommand', $CrashWorld_rollDiceCommand$1 = function $$rollDiceCommand(command) {
      var self = this, result = nil, $case = nil;

      
      result = nil;
      $case = command;
      if (/CW(\d+)/i['$===']($case)) {result = self.$getCrashWorldRoll($$($nesting, 'Regexp').$last_match(1).$to_i())};
      return result;
    }, $CrashWorld_rollDiceCommand$1.$$arity = 1);
    return (Opal.def(self, '$getCrashWorldRoll', $CrashWorld_getCrashWorldRoll$2 = function $$getCrashWorldRoll(target) {
      var $a, $b, $c, self = this, output = nil, isEnd = nil, successness = nil, num = nil;

      
      self.$debug("target", target);
      output = "(";
      isEnd = false;
      successness = 0;
      num = 0;
      while ($truthy(isEnd['$!']())) {
        
        $c = self.$roll(1, 12), $b = Opal.to_ary($c), (num = ($b[0] == null ? nil : $b[0])), $c;
        if (output['$==']("(")) {
          output = "" + "(" + (num)
        } else {
          output = "" + (output) + ", " + (num)
        };
        if ($truthy(($truthy($b = $rb_le(num, target)) ? $b : num['$=='](11)))) {
          
          target = num;
          successness = $rb_plus(successness, 1);
        } else if (num['$=='](12)) {
          isEnd = true
        } else {
          isEnd = true
        };
      };
      if (num['$=='](12)) {
        successness = 0};
      output = "" + (output) + ")  成功度 : " + (successness);
      if (num['$=='](12)) {
        output = "" + (output) + " ファンブル"};
      return output;
    }, $CrashWorld_getCrashWorldRoll$2.$$arity = 1), nil) && 'getCrashWorldRoll';
  })($nesting[0], $$($nesting, 'DiceBot'), $nesting)
})(Opal);
